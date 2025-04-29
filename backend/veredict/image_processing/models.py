import enum
import uuid

from django.db import models

from storage_backends import MediaStorage
from veredict.core.models import ModelBase
from veredict.image_processing.services.token_processing import (
    convert_date_format,
    map_city_code,
    parse_ocr,
)


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
    processing_image = models.ForeignKey(
        ProcessingImage,
        on_delete=models.CASCADE,
        related_name="metadata",
    )
    ocr_code = models.CharField(max_length=256, null=True, blank=True)
    date = models.CharField(max_length=256, null=True, blank=True)
    city = models.CharField(max_length=256, null=True, blank=True)

    class AlertTypes(str, enum.Enum):
        WARNING = "warning"
        ERROR = "error"

    @property
    def ocr_code_flag(self):
        if (
            not self.ocr_code
            or self.processing_image.metadata.filter(
                ocr_code=self.ocr_code
            ).count()
            > 1
        ):
            return self.AlertTypes.ERROR

    @property
    def ocr_date_flag(self):
        if not self.date:
            return self.AlertTypes.ERROR

    @property
    def city_flag(self):
        if not self.city:
            return self.AlertTypes.ERROR

        if self.processing_image.metadata.filter(city=self.city).count() > 1:
            return self.AlertTypes.WARNING

    @property
    def token(self):
        try:
            date = convert_date_format(self.date)
            city_code = map_city_code(self.city)
            ocr = parse_ocr(self.ocr_code)

            return f"BO{date}{city_code}{ocr}"

        except Exception:
            ...

    def _format_city(self):
        if self.city:
            return self.city.upper()

        return self.city

    def save(self, *args, **kwargs):
        self.city = self._format_city()
        super().save(*args, **kwargs)
