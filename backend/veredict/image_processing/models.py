import uuid

from django.db import models

from storage_backends import MediaStorage
from veredict.core.models import ModelBase


def upload_to(instance, filename):
    processing_pk = instance.processing.pk
    ext = filename.split(".")[-1]
    new_filename = f"{uuid.uuid4()}.{ext}"
    return f"processings/images/{processing_pk}/{new_filename}"


class Processing(ModelBase): ...


class ProcessingImage(ModelBase):
    processing = models.ForeignKey(Processing, null=False, on_delete=models.CASCADE)
    image = models.FileField(
        null=False, blank=False, upload_to=upload_to, storage=MediaStorage()
    )


class ImageMetadata(ModelBase):
    processing_image = models.OneToOneField(
        ProcessingImage, null=False, on_delete=models.CASCADE, related_name="metadata"
    )
    ocr_code_1 = models.CharField(max_length=256, null=True, blank=True)
    date_1 = models.CharField(max_length=256, null=True, blank=True)
    city_1 = models.CharField(max_length=256, null=True, blank=True)
    ocr_code_2 = models.CharField(max_length=256, null=True, blank=True)
    date_2 = models.CharField(max_length=256, null=True, blank=True)
    city_2 = models.CharField(max_length=256, null=True, blank=True)
    ocr_code_3 = models.CharField(max_length=256, null=True, blank=True)
    date_3 = models.CharField(max_length=256, null=True, blank=True)
    city_3 = models.CharField(max_length=256, null=True, blank=True)
