from pathlib import Path

import pytest
from django.conf import settings

from veredict.image_processing.models import ImageMetadata
from veredict.image_processing.services.image_processing import (
    textract_processing_image,
)


@pytest.fixture
def file_source():
    filename = "occurrence.jpeg"
    current_parent = Path(__file__).resolve().parent
    return str(settings.BASE_DIR / current_parent / filename)


@pytest.mark.vcr
def test_textract_processing_image(monkeypatch, processing_image, file_source):
    """
    Tests that `textract_processing_image` extracts OCR data from the image
    and correctly populates `ProcessingImageMetadata`.
    """
    monkeypatch.setattr(
        "veredict.utils.files.get_file_path",
        lambda *args, **kwargs: file_source,
    )

    textract_processing_image(processing_image)
    processing_image.refresh_from_db()

    metadata = processing_image.metadata

    assert metadata.count() == 3
    assert metadata.filter(
        ocr_code="3026", date="27/01/2025", city="SAO ROQUE"
    ).exists()
    assert metadata.filter(
        ocr_code="3066", date="27/01/2025", city="IBIUNA"
    ).exists()
    assert metadata.filter(
        ocr_code="3095", date="27/01/2025", city="GUARULHOS"
    ).exists()
