import pytest


@pytest.fixture(autouse=True, scope="module")
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
