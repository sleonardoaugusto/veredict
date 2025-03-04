from pathlib import Path

from decouple import config

from veredict.settings.base import BASE_DIR

if config("USE_S3", cast=bool, default=True):
    AWS_ACCESS_KEY_ID = config("AWS_ACCESS_KEY_ID", "")
    AWS_SECRET_ACCESS_KEY = config("AWS_SECRET_ACCESS_KEY", "")
    AWS_STORAGE_BUCKET_NAME = config("AWS_STORAGE_BUCKET_NAME", "")
    AWS_S3_CUSTOM_DOMAIN = f"{AWS_STORAGE_BUCKET_NAME}.s3.amazonaws.com"
    AWS_S3_OBJECT_PARAMETERS = {"CacheControl": "max-age=86400"}

    STATICFILES_STORAGE = "storages.backends.s3boto3.S3Boto3Storage"
    STATIC_URL = f"https://{AWS_S3_CUSTOM_DOMAIN}/static/"
    MEDIA_URL = f"https://{AWS_S3_CUSTOM_DOMAIN}/media/"
else:
    STATIC_URL = "/staticfiles/"
    STATIC_ROOT = str(Path.joinpath(BASE_DIR, "staticfiles"))
    MEDIA_URL = "/mediafiles/"
    MEDIA_ROOT = str(Path.joinpath(BASE_DIR, "mediafiles"))
    DEFAULT_FILE_STORAGE = "django.core.files.storage.FileSystemStorage"
