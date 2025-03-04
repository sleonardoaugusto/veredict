from django.conf import settings
from django.db.models.fields.files import FieldFile


def get_file_path(file: FieldFile):
    if settings.USE_S3:
        return get_s3_uri(file)

    return get_path(file)


def get_path(file: FieldFile):
    return file.path


def get_s3_uri(doc: FieldFile) -> str:
    """Returns the S3 URI of a Django FieldFile."""
    return f"s3://{settings.AWS_STORAGE_BUCKET_NAME}/{doc.storage.location}/{doc.name}"
