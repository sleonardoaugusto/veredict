from unittest.mock import patch

import pytest
from django.core.files.storage import FileSystemStorage
from django.urls import reverse
from rest_framework import status

from veredict.image_processing.models import Processing, ProcessingImage


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
