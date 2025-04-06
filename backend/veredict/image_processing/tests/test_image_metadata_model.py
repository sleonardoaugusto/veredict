import pytest

from veredict.image_processing.models import ImageMetadata


@pytest.mark.parametrize(
    "attr1, attr2, property_",
    [
        ("ocr_code_1", "ocr_code_2", "ocr_code_1_flag"),
        ("ocr_code_1", "ocr_code_3", "ocr_code_1_flag"),
        ("ocr_code_2", "ocr_code_1", "ocr_code_2_flag"),
        ("ocr_code_2", "ocr_code_3", "ocr_code_2_flag"),
        ("ocr_code_3", "ocr_code_1", "ocr_code_3_flag"),
        ("ocr_code_3", "ocr_code_2", "ocr_code_3_flag"),
    ],
)
def test_duplicated_code_flag(attr1, attr2, property_, image_metadata):
    setattr(image_metadata, attr1, "1")
    setattr(image_metadata, attr2, "1")
    image_metadata.save()

    assert getattr(image_metadata, property_) == ImageMetadata.AlertTypes.ERROR


@pytest.mark.parametrize(
    "attr1, attr2, property_",
    [
        ("city_1", "city_2", "city_1_flag"),
        ("city_1", "city_3", "city_1_flag"),
        ("city_2", "city_1", "city_2_flag"),
        ("city_2", "city_3", "city_2_flag"),
        ("city_3", "city_1", "city_3_flag"),
        ("city_3", "city_2", "city_3_flag"),
    ],
)
def test_duplicated_city_flag(attr1, attr2, property_, image_metadata):
    setattr(image_metadata, attr1, "SAO ROQUE")
    setattr(image_metadata, attr2, "SAO ROQUE")
    image_metadata.save()

    assert (
        getattr(image_metadata, property_) == ImageMetadata.AlertTypes.WARNING
    )
