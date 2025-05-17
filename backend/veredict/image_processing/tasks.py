from veredict.celery.app import celery_app
from veredict.image_processing.models import (
    ProcessingImage,
    ProcessingStatuses,
)
from veredict.image_processing.services.image_processing import (
    textract_processing_image,
)
from veredict.utils.logger import get_logger

logger = get_logger()


@celery_app.task(name="parse_processing_image")
def parse_processing_image(processing_image_pk: int):
    logger.info(f"Starting image processing '{processing_image_pk}'")

    processing_image = ProcessingImage.objects.get(pk=processing_image_pk)
    processing_image.status = ProcessingStatuses.PENDING
    processing_image.save(update_fields=["status"])

    try:
        textract_processing_image(processing_image)
        processing_image.status = ProcessingStatuses.COMPLETED
        processing_image.save(update_fields=["status"])

    except Exception:
        processing_image.status = ProcessingStatuses.FAILED
        processing_image.save(update_fields=["status"])
