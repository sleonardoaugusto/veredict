import enum
import uuid

from django.db import models

from storage_backends import MediaStorage
from veredict.core.models import ModelBase


def upload_to(instance, filename):
    processing_pk = instance.processing.pk
    ext = filename.split(".")[-1]
    new_filename = f"{uuid.uuid4()}.{ext}"
    return f"{ProcessingImage.DOCUMENT_ROOT_FOLDER}/images/{processing_pk}/{new_filename}"


class Processing(ModelBase): ...


class ProcessingImage(ModelBase):
    DOCUMENT_ROOT_FOLDER = "processings"

    processing = models.ForeignKey(
        Processing, null=False, on_delete=models.CASCADE
    )
    image = models.FileField(
        null=False, blank=False, upload_to=upload_to, storage=MediaStorage()
    )


class ImageMetadata(ModelBase):
    processing_image = models.OneToOneField(
        ProcessingImage,
        null=False,
        on_delete=models.CASCADE,
        related_name="metadata",
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

    class AlertTypes(str, enum.Enum):
        WARNING = "warning"
        ERROR = "error"

    @property
    def ocr_code_1_flag(self):
        if not self.ocr_code_1 or self.ocr_code_1 in [
            self.ocr_code_2,
            self.ocr_code_3,
        ]:
            return self.AlertTypes.ERROR

    @property
    def ocr_code_2_flag(self):
        if not self.ocr_code_2 or self.ocr_code_2 in [
            self.ocr_code_1,
            self.ocr_code_3,
        ]:
            return self.AlertTypes.ERROR

    @property
    def ocr_code_3_flag(self):
        if not self.ocr_code_3 or self.ocr_code_3 in [
            self.ocr_code_1,
            self.ocr_code_2,
        ]:
            return self.AlertTypes.ERROR

    @property
    def city_1_flag(self):
        if not self.city_1:
            return self.AlertTypes.ERROR

        if self.city_1 == self.city_2 or self.city_1 == self.city_3:
            return self.AlertTypes.WARNING

    @property
    def city_2_flag(self):
        if not self.city_2:
            return self.AlertTypes.ERROR

        if self.city_2 == self.city_1 or self.city_2 == self.city_3:
            return self.AlertTypes.WARNING

    @property
    def city_3_flag(self):
        if not self.city_3:
            return self.AlertTypes.ERROR

        if self.city_3 == self.city_1 or self.city_3 == self.city_2:
            return self.AlertTypes.WARNING
