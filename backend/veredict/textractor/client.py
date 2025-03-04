from typing import List, Optional

import textractor.entities.document as ted
from django.db.models.fields.files import FieldFile
from textractor import Textractor
from textractor.data.constants import TextractFeatures

from veredict.utils import files
from veredict.utils.logger import get_logger
import textractcaller as tc

logger = get_logger()


class TextractorClient:
    def __init__(
        self,
        doc: FieldFile,
        features: List[TextractFeatures],
        queries: Optional[List[tc.Query]] = None,
    ):
        self.client = Textractor()
        self.doc = doc
        self.features = features
        self.queries = queries

    def run(self) -> ted.Document:
        file_source = files.get_file_path(self.doc)
        logger.info(f"Retrieved file source from S3 '{file_source}'")

        return self.client.analyze_document(
            file_source=file_source,
            features=self.features,
            queries=self.queries,
        )
