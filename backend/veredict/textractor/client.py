from typing import List, Optional

import textractor.entities.document as ted
import textractor.entities.query as teq
from django.db.models.fields.files import FieldFile
from textractor import Textractor
from textractor.data.constants import TextractFeatures

from veredict.utils import s3
from veredict.utils.logger import get_logger
import textractcaller as tc

logger = get_logger()


class TextractorClient:
    def __init__(self, queries: List[teq.Query], doc: FieldFile):
        self.client = Textractor()
        self.queries = queries
        self.doc = doc

    def run(
        self, features: List[TextractFeatures], queries: Optional[List[tc.Query]] = None
    ) -> ted.Document:
        file_source = s3.get_s3_uri(self.doc)
        logger.info(f"Retrieved file source from S3 '{file_source}'")

        return self.client.analyze_document(
            file_source=file_source,
            features=features,
            queries=queries,
        )
