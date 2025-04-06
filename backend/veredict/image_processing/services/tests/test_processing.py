from pathlib import Path

import pytest
from django.conf import settings

from veredict.image_processing.models import ImageMetadata
from veredict.image_processing.services.processing import (
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
    metadata = ImageMetadata.objects.get()

    assert metadata.processing_image == processing_image
    assert metadata.ocr_code_1 == "3026"
    assert metadata.date_1 == "27/01/2025"
    assert metadata.city_1 == "SAO ROQUE"
    assert metadata.ocr_code_2 == "3066"
    assert metadata.date_2 == "27/01/2025"
    assert metadata.city_2 == "IBIUNA"
    assert metadata.ocr_code_3 == "3095"
    assert metadata.date_3 == "27/01/2025"
    assert metadata.city_3 == "GUARULHOS"
