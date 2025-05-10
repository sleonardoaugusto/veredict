import pytest

from veredict.image_processing.models import ProcessingStatuses, ProcessingImage


class TestProcessStatus:
    @pytest.mark.parametrize(
        "image_statuses, expected_processing_status",
        [
            (
                [
                    ProcessingStatuses.PENDING,
                    ProcessingStatuses.PENDING,
                ],
                ProcessingStatuses.PENDING.label,
            ),
            (
                [
                    ProcessingStatuses.PENDING,
                    ProcessingStatuses.COMPLETED,
                ],
                ProcessingStatuses.PROCESSING.label,
            ),
            (
                [
                    ProcessingStatuses.COMPLETED,
                    ProcessingStatuses.COMPLETED,
                ],
                ProcessingStatuses.COMPLETED.label,
            ),
            (
                [
                    ProcessingStatuses.FAILED,
                    ProcessingStatuses.COMPLETED,
                ],
                ProcessingStatuses.COMPLETED.label,
            ),
            (
                [
                    ProcessingStatuses.FAILED,
                    ProcessingStatuses.FAILED,
                ],
                ProcessingStatuses.COMPLETED.label,
            ),
        ],
    )
    def test_process_status(
        self, image_statuses, expected_processing_status, processing
    ):
        status_1, status_2 = image_statuses

        ProcessingImage.objects.create(processing=processing, status=status_1)
        ProcessingImage.objects.create(processing=processing, status=status_2)

        assert processing.status == expected_processing_status
