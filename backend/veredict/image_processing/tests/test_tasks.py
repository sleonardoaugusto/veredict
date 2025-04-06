from unittest.mock import patch

from veredict.image_processing.tasks import parse_processing_image


@patch("veredict.image_processing.tasks.textract_processing_image")
def test_parse_processing_image(
    mock_textract_processing_image, processing_image
):
    """
    Test that `parse_processing_image` correctly calls `textract_processing_image`
    with the expected `processing_image` instance.
    """
    parse_processing_image(processing_image.pk)
    mock_textract_processing_image.assert_called_once_with(processing_image)
