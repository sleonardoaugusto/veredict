from veredict.celery.app import celery_app
from veredict.image_processings.models import ProcessingImage
from veredict.image_processings.services.processing import textract_processing_image


@celery_app.task(name="parse_processing_image")
def parse_processing_image(processing_image_pk: int):
    processing_image = ProcessingImage.objects.get(pk=processing_image_pk)
    textract_processing_image(processing_image)
