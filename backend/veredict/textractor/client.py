from typing import List

import textractor.entities.document as ted
import textractor.entities.query as teq
from django.db.models.fields.files import FieldFile
from textractor import Textractor
from textractor.data.constants import TextractFeatures

from veredict.utils import s3


class TextractorClient:
    def __init__(self, queries: List[teq.Query], doc: FieldFile):
        self.client = Textractor()
        self.queries = queries
        self.doc = doc

    def run(self) -> ted.Document:
        return self.client.analyze_document(
            file_source=s3.get_s3_uri(self.doc),
            features=[TextractFeatures.QUERIES],
            queries=self.queries,
        )
