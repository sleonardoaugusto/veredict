import re
from typing import List

from textractor.data.constants import TextractFeatures
from veredict.image_processing.models import (
    ProcessingImage,
    ImageMetadata,
    Processing,
)

from veredict.textractor.client import TextractorClient
from veredict.utils.logger import get_logger

import textractcaller as tc
import textractor.entities.query as e

logger = get_logger()


def _remove_suffix(text: str):
    """
    Remove any underscore followed by digits (e.g., '_123') from the input text.

    Args:
        text (str): The input string.

    Returns:
        str: The string with numeric suffixes (e.g., '_123') removed.
    """
    return re.sub(r"_\d+", "", text)


def _parse_results(results: List[e.Query]) -> List[dict]:
    """
    Parse a list of query results, cleaning lookup keys by removing numeric suffixes.

    Args:
        results (List[e.Query]): List of query results.

    Returns:
        List[dict]: List of metadata dictionaries with cleaned keys and corresponding results.
    """
    lookup_groups = [
        ("ocr_code_1", "date_1", "city_1", "top"),
        ("ocr_code_2", "date_2", "city_2", "middle"),
        ("ocr_code_3", "date_3", "city_3", "bottom"),
    ]

    parsed_metadata = []

    for lookup_group in lookup_groups:
        metadata = {}
        for lookup_key in lookup_group:
            for query in results:
                if lookup_key in ("top", "middle", "bottom"):
                    metadata["position"] = lookup_key

                if query.alias == lookup_key:
                    cleaned_key = _remove_suffix(query.alias)
                    metadata[cleaned_key] = query.result.text

        parsed_metadata.append(metadata)

    return parsed_metadata


def _create_image_metadata(processing_image: ProcessingImage, result: dict):
    metadata = ImageMetadata(processing_image=processing_image)

    metadata.ocr_code = result["ocr_code"]
    metadata.date = result["date"]
    metadata.city = result["city"]
    metadata.position = result["position"]

    metadata.save()


def _populate_processing_image_metadata(
    results: List[e.Query], processing_image: ProcessingImage
):
    results_parsed = _parse_results(results)

    for result in results_parsed:
        _create_image_metadata(processing_image=processing_image, result=result)


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

    _populate_processing_image_metadata(
        results=document.queries, processing_image=processing_image
    )


def get_processing_tokens(processing: Processing):
    tokens = []

    for image in processing.processing_images.all():
        for metadata in image.metadata.all():
            if metadata.tokens:
                for token in metadata.tokens:
                    tokens.append(token)

    return tokens
