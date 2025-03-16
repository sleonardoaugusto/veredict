import json
from unittest.mock import patch

import pytest
from django.core.files.storage import FileSystemStorage
from django.urls import reverse
from model_bakery import baker
from rest_framework import status

from veredict.image_processing.models import (
    Processing,
    ProcessingImage,
    ImageMetadata,
)


@pytest.fixture
def processing():
    return Processing.objects.create()


def test_get_processings(client, processing):
    url = reverse("api-v1:processing")
    response = client.get(url)
    assert response.status_code == status.HTTP_200_OK
    assert len(response.json()) == 1
    assert set(response.json()[0]) == {"id", "created_at"}


def test_post_processing(client):
    assert not Processing.objects.exists()

    url = reverse("api-v1:processing")
    response = client.post(url, data={})

    assert response.status_code == status.HTTP_201_CREATED
    assert set(response.json()) == {"id"}
    assert Processing.objects.count() == 1


@patch("veredict.api.v1.image_processing.views.parse_processing_image")
def test_post_processing_image(
    mock_parse_processing_image, client, processing, file
):
    ProcessingImage.image.field.storage = FileSystemStorage()

    assert not ProcessingImage.objects.exists()

    url = reverse(
        "api-v1:processing-image", kwargs={"processing_pk": processing.pk}
    )
    data = {"image": file}
    response = client.post(url, data)

    assert response.status_code == status.HTTP_201_CREATED
    assert set(response.json()) == {"id", "image", "processing"}

    record = ProcessingImage.objects.get(processing=processing)
    # assert parse function is called
    mock_parse_processing_image.delay_on_commit.assert_called_once_with(
        record.pk
    )


@pytest.fixture
def processing_image(processing, file):
    ProcessingImage.image.field.storage = FileSystemStorage()
    return ProcessingImage.objects.create(processing=processing, image=file)


def test_get_processing_images(client, processing_image):
    url = reverse(
        "api-v1:processing-image",
        kwargs={"processing_pk": processing_image.processing.pk},
    )
    response = client.get(url)
    assert response.status_code == status.HTTP_200_OK
    assert len(response.json()) == 1


@pytest.fixture
def image_metadata(processing_image):
    return ImageMetadata.objects.create(processing_image=processing_image)


def test_get_processing_image_metadata(client, image_metadata):
    url = reverse(
        "api-v1:image-metadata",
        kwargs={"processing_image_pk": image_metadata.processing_image.pk},
    )
    response = client.get(url)

    assert response.status_code == status.HTTP_200_OK
    assert set(response.json()) == {
        "city_1",
        "city_2",
        "city_3",
        "date_1",
        "date_2",
        "date_3",
        "ocr_code_1",
        "ocr_code_2",
        "ocr_code_3",
        "processing_image",
    }


@pytest.mark.parametrize(
    "field, value",
    [
        ("ocr_code_1", "12345"),
        ("date_1", "2024-03-10"),
        ("city_1", "New York"),
        ("ocr_code_2", "67890"),
        ("date_2", "2024-03-11"),
        ("city_2", "Los Angeles"),
        ("ocr_code_3", "ABCDE"),
        ("date_3", "2024-03-12"),
        ("city_3", "Chicago"),
    ],
)
def test_patch_processing_image_metadata(client, image_metadata, field, value):
    url = reverse(
        "api-v1:image-metadata",
        kwargs={"processing_image_pk": image_metadata.processing_image.pk},
    )

    data = {field: value}

    response = client.patch(
        url, data=json.dumps(data), content_type="application/json"
    )

    image_metadata.refresh_from_db()

    assert response.status_code == status.HTTP_200_OK
    assert getattr(image_metadata, field) == value
