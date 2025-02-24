from unittest.mock import patch

import pytest
from django.urls import reverse
from rest_framework import status

from veredict.image_processings.models import Processing, ProcessingImage


def test_post_processing(client):
    assert not Processing.objects.exists()

    url = reverse("api-v1:processing")
    response = client.post(url, data={})

    assert response.status_code == status.HTTP_201_CREATED
    assert set(response.json()) == {"id"}
    assert Processing.objects.count() == 1


@pytest.fixture
def processing():
    return Processing.objects.create()


@patch("veredict.api.v1.image_processings.views.parse_processing_image")
def test_post_processing_image(mock_parse_processing_image, client, processing, file):
    assert not ProcessingImage.objects.exists()

    url = reverse("api-v1:processing-image", kwargs={"processing_pk": processing.id})
    data = {"image": file}
    response = client.post(url, data)

    assert response.status_code == status.HTTP_201_CREATED
    assert set(response.json()) == {"id", "image", "processing"}

    record = ProcessingImage.objects.get(processing=processing)
    # assert parse function is called
    mock_parse_processing_image.delay_on_commit.assert_called_once_with(record.pk)
