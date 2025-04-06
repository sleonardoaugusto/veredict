import pytest
from django.core.files.storage import FileSystemStorage

from veredict.image_processing.models import (
    Processing,
    ProcessingImage,
    ImageMetadata,
)


@pytest.fixture
def processing():
    return Processing.objects.create()


@pytest.fixture
def processing_image(processing, file):
    ProcessingImage.image.field.storage = FileSystemStorage()
    return ProcessingImage.objects.create(processing=processing, image=file)


@pytest.fixture
def image_metadata(processing_image):
    return ImageMetadata.objects.create(processing_image=processing_image)
