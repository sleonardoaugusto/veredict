import pytest

from veredict.image_processing.models import ImageMetadata


class TestCodeFlag:
    @pytest.mark.parametrize(
        "attr1, property_",
        [
            ("ocr_code_1", "ocr_code_1_flag"),
            ("ocr_code_2", "ocr_code_2_flag"),
            ("ocr_code_3", "ocr_code_3_flag"),
        ],
    )
    def test_empty_code_flag(self, attr1, property_, image_metadata):
        """
        Ensures that if any OCR code field is set to None,
        the corresponding flag is marked as an ERROR.
        """
        image_metadata.ocr_code_1 = "1"
        image_metadata.ocr_code_2 = "2"
        image_metadata.ocr_code_3 = "3"

        setattr(image_metadata, attr1, None)
        image_metadata.save()

        assert (
            getattr(image_metadata, property_) == ImageMetadata.AlertTypes.ERROR
        )

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
    def test_duplicated_code_flag(
        self, attr1, attr2, property_, image_metadata
    ):
        """
        Ensures that if two OCR code fields share the
        same value, the corresponding flag of the first duplicated field is marked
        as an ERROR.
        """
        setattr(image_metadata, attr1, "1")
        setattr(image_metadata, attr2, "1")
        image_metadata.save()

        assert (
            getattr(image_metadata, property_) == ImageMetadata.AlertTypes.ERROR
        )


class CityFlag:
    @pytest.mark.parametrize(
        "attr1, property_",
        [
            ("city_1", "city_1_flag"),
            ("city_2", "city_2_flag"),
            ("city_3", "city_3_flag"),
        ],
    )
    def test_empty_city_flag(self, attr1, property_, image_metadata):
        """
        Ensures that if any city field is set to None,
        the corresponding flag is marked as an ERROR.
        """
        image_metadata.city_1 = "UBERABA"
        image_metadata.city_2 = "UBERLANDIA"
        image_metadata.city_3 = "SAO JOAO BATISTA DO GLORIA"

        setattr(image_metadata, attr1, None)
        image_metadata.save()

        assert (
            getattr(image_metadata, property_) == ImageMetadata.AlertTypes.ERROR
        )

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
    def test_duplicated_city_flag(
        self, attr1, attr2, property_, image_metadata
    ):
        """
        Ensures that if two city fields share the
        same value, the corresponding flag of the first duplicated field is marked
        as a WARNING.
        """
        setattr(image_metadata, attr1, "SAO ROQUE")
        setattr(image_metadata, attr2, "SAO ROQUE")
        image_metadata.save()

        assert (
            getattr(image_metadata, property_)
            == ImageMetadata.AlertTypes.WARNING
        )
