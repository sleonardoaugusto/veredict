from typing import List
from textractor.data.constants import TextractFeatures
from veredict.image_processing.models import (
    Processing,
    ProcessingImage,
    ImageMetadata,
)

from veredict.textractor.client import TextractorClient
from veredict.utils.logger import get_logger

import textractcaller as tc
import textractor.entities.query as e

logger = get_logger()


def _populate_processing_image_metadata(
    results: List[e.Query],
    processing_image: ProcessingImage,
):
    try:
        metadata = processing_image.metadata
    except AttributeError:
        metadata = ImageMetadata(processing_image=processing_image)

    for query in results:
        setattr(metadata, query.alias, query.result)

    metadata.save()
    logger.info(
        f"image_processing::Document metadata successfully updated for '{processing_image.pk}'. Updated fields: {results}"
    )


def textract_processing_image(
    processing_image: ProcessingImage,
):
    queries = [
        tc.Query(
            "what is the Ocorrencia code number at the top?",
            alias="ocr_code_1",
        ),
        tc.Query("what is the Date at the top?", alias="date_1"),
        tc.Query(
            "what is the Municipio at the top?",
            alias="city_1",
        ),
        tc.Query(
            "what is the Ocorrencia code number at the middle?",
            alias="ocr_code_2",
        ),
        tc.Query(
            "what is the Date at the middle?",
            alias="date_2",
        ),
        tc.Query(
            "what is the Municipio at the middle?",
            alias="city_2",
        ),
        tc.Query(
            "what is the Ocorrencia code number at the bottom?",
            alias="ocr_code_3",
        ),
        tc.Query(
            "what is the Date at the bottom?",
            alias="date_3",
        ),
        tc.Query(
            "what is the Municipio at the bottom?",
            alias="city_3",
        ),
    ]

    textractor = TextractorClient(
        doc=processing_image.image,
        features=[TextractFeatures.QUERIES],
        queries=queries,
    )
    logger.info(
        f"image_processing::Retrieved Textract service instance '{processing_image.pk}'."
    )

    document = textractor.run()
    logger.info(
        f"image_processing::Analysis completed for '{processing_image.pk}', processing metadata."
    )

    _populate_processing_image_metadata(document.queries, processing_image)
