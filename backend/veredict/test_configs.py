import shutil

import pytest

from pathlib import Path
from django.conf import settings
from veredict.attendances.models import AttendanceFile
from veredict.image_processing.models import ProcessingImage


@pytest.fixture(scope="module", autouse=True)
def delete_document_folders():
    yield  # make sure it runs after tests
    for directory in [
        AttendanceFile.DOCUMENT_ROOT_FOLDER,
        ProcessingImage.DOCUMENT_ROOT_FOLDER,
    ]:
        path = Path(settings.BASE_DIR.parent / directory)
        if path.exists():
            shutil.rmtree(path)


@pytest.fixture(scope="module", autouse=True)
def vcr_config():
    return {
        "match_on": [
            "method",
            "scheme",
            "path",
            "raw_body",
            "query",
        ],
    }
