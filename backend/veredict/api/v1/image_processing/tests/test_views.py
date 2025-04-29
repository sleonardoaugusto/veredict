import json
from unittest.mock import patch

import pytest
from django.core.files.storage import FileSystemStorage
from django.urls import reverse
from rest_framework import status

from veredict.image_processing.models import (
    Processing,
    ProcessingImage,
    ImageMetadata,
)


class TestProcessingListView:
    def test_get_processings(self, client, processing):
        url = reverse("api-v1:processing")
        response = client.get(url)
        assert response.status_code == status.HTTP_200_OK
        assert len(response.json()) == 1
        assert set(response.json()[0]) == {"id", "created_at"}

    def test_post_processing(self, client):
        assert not Processing.objects.exists()

        url = reverse("api-v1:processing")
        response = client.post(url, data={})

        assert response.status_code == status.HTTP_201_CREATED
        assert set(response.json()) == {"id"}
        assert Processing.objects.count() == 1


class TestProcessingImageListCreateView:
    @patch("veredict.api.v1.image_processing.views.parse_processing_image")
    def test_post_processing_image(
        self, mock_parse_processing_image, client, processing, file
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

    def test_get_processing_images(self, client, processing_image):
        url = reverse(
            "api-v1:processing-image",
            kwargs={"processing_pk": processing_image.processing.pk},
        )
        response = client.get(url)
        assert response.status_code == status.HTTP_200_OK
        assert len(response.json()) == 1
        assert set(response.json()[0]) == {"id", "processing", "image"}


class TestImageMetadataListUpdateView:
    @pytest.mark.parametrize(
        "field, value, expected",
        [
            ("ocr_code", "12345", "12345"),
            ("date", "10/03/2024", "10/03/2024"),
            ("city", "New York", "NEW YORK"),
        ],
    )
    def test_patch_processing_image_metadata(
        self, client, image_metadata, field, value, expected
    ):
        url = reverse(
            "api-v1:image-metadata-update",
            kwargs={
                "processing_image_pk": image_metadata.processing_image.pk,
                "image_metadata_pk": image_metadata.pk,
            },
        )

        data = {field: value}

        response = client.patch(
            url, data=json.dumps(data), content_type="application/json"
        )

        image_metadata.refresh_from_db()

        assert response.status_code == status.HTTP_200_OK
        assert getattr(image_metadata, field) == expected
        assert set(response.json()) == {
            "id",
            "city",
            "date",
            "ocr_code",
            "ocr_code_flag",
            "city_flag",
        }

    def test_get_processing_image_metadata(self, client, processing_image):
        [
            ImageMetadata.objects.create(processing_image=processing_image)
            for _ in range(2)
        ]
        url = reverse(
            "api-v1:image-metadata-list",
            kwargs={"processing_image_pk": processing_image.pk},
        )

        response = client.get(url)

        assert response.status_code == status.HTTP_200_OK
        assert len(response.json()) == 2
        assert set(response.json()[0]) == {
            "ocr_code",
            "city_flag",
            "city",
            "date",
            "ocr_code_flag",
            "id",
        }
