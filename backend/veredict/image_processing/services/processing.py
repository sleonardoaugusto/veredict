from typing import List

from veredict.image_processing.models import (
    Processing,
    ProcessingImage,
    ImageMetadata,
)
import textractcaller as tc

from veredict.textractor.client import TextractorClient
import textractor.entities.query as e

from veredict.utils.logger import get_logger

logger = get_logger()


def get_processing(pk: int):
    return Processing.objects.get(pk=pk)


def _populate_processing_image_metadata(
    results: List[e.Query], processing_image: ProcessingImage
):
    try:
        metadata = processing_image.metadata
    except AttributeError:
        metadata = ImageMetadata(processing_image=processing_image)

    for query in results:
        setattr(metadata, query.alias, query.result)

    logger.info(
        f"Document metadata successfully updated for '{processing_image.pk}'. Updated fields: {results}"
    )

    metadata.save()


def textract_processing_image(processing_image: ProcessingImage):
    queries = [
        tc.Query("what is the Ocorrencia code number at the top?", alias="ocr_code_1"),
        tc.Query("what is the Date at the top?", alias="date_1"),
        tc.Query("what is the Municipio at the top?", alias="city_1"),
        tc.Query(
            "what is the Ocorrencia code number at the middle?", alias="ocr_code_2"
        ),
        tc.Query("what is the Date at the middle?", alias="date_2"),
        tc.Query("what is the Municipio at the middle?", alias="city_2"),
        tc.Query(
            "what is the Ocorrencia code number at the bottom?", alias="ocr_code_3"
        ),
        tc.Query("what is the Date at the bottom?", alias="date_3"),
        tc.Query("what is the Municipio at the bottom?", alias="city_3"),
    ]

    logger.info(f"Starting image metadata extraction '{processing_image.pk}'")
    textractor = TextractorClient(queries=queries, doc=processing_image.image)
    logger.info(f"Retrieved Textract service instance '{processing_image.pk}'.")
    document = textractor.run()
    logger.info(f"Analysis completed for '{processing_image.pk}', processing metadata.")
    _populate_processing_image_metadata(document.queries, processing_image)
