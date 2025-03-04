from unittest.mock import patch

import pytest
from django.core.files.storage import FileSystemStorage
from model_bakery import baker

from veredict.image_processing.models import ProcessingImage
from veredict.image_processing.tasks import parse_processing_image


@pytest.fixture
def processing_image(file):
    ProcessingImage.image.field.storage = FileSystemStorage()
    return baker.make("ProcessingImage", image=file)


@patch("veredict.image_processing.tasks.textract_processing_image")
def test_parse_processing_image(
    mock_textract_processing_image, processing_image
):
    """
    Test that `parse_processing_image` correctly calls `textract_processing_image`
    with the expected `processing_image` instance.
    """
    parse_processing_image(processing_image.pk)
    mock_textract_processing_image.assert_called_once_with(processing_image)
