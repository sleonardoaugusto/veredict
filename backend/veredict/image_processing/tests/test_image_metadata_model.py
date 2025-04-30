from veredict.image_processing.models import ImageMetadata


class TestCodeFlag:
    def test_empty_code_flag(self, processing_image):
        """
        Ensures that if any OCR code field is set to None,
        the corresponding flag is marked as an ERROR.
        """
        image_metadata = ImageMetadata.objects.create(
            processing_image=processing_image, ocr_code=""
        )

        assert image_metadata.ocr_code_flag == ImageMetadata.AlertTypes.ERROR

    def test_duplicated_code_flag(self, processing_image):
        """
        Ensures that if two OCR code fields share the
        same value, the corresponding flag of the first duplicated field is marked
        as an ERROR.
        """
        image_metadata_1 = ImageMetadata.objects.create(
            processing_image=processing_image, ocr_code="1"
        )
        image_metadata_2 = ImageMetadata.objects.create(
            processing_image=processing_image, ocr_code="1"
        )

        assert image_metadata_1.ocr_code_flag == ImageMetadata.AlertTypes.ERROR
        assert image_metadata_2.ocr_code_flag == ImageMetadata.AlertTypes.ERROR


class TestCityFlag:
    def test_empty_city_flag(self, processing_image):
        """
        Ensures that if any city field is set to None,
        the corresponding flag is marked as an ERROR.
        """
        image_metadata = ImageMetadata.objects.create(
            processing_image=processing_image, city=""
        )

        assert image_metadata.city_flag == ImageMetadata.AlertTypes.ERROR

    def test_duplicated_city_flag(self, processing_image):
        """
        Ensures that if two city fields share the
        same value, the corresponding flag of the first duplicated field is marked
        as a WARNING.
        """
        image_metadata_1 = ImageMetadata.objects.create(
            processing_image=processing_image, city="SAO SEBASTIAO"
        )
        image_metadata_2 = ImageMetadata.objects.create(
            processing_image=processing_image, city="SAO SEBASTIAO"
        )

        assert image_metadata_1.city_flag == ImageMetadata.AlertTypes.WARNING
        assert image_metadata_2.city_flag == ImageMetadata.AlertTypes.WARNING


class TestToken:
    def test_token(self, processing_image):
        image_metadata = ImageMetadata.objects.create(
            processing_image=processing_image,
            ocr_code="1",
            city="SOROCABA",
            date="31/12/2025",
        )

        assert image_metadata.token == "BO202512310400001"
