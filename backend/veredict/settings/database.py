from decouple import config
from dj_database_url import parse as dburl
from django.conf import settings

default_dburl = f"sqlite:///{settings.BASE_DIR}/db.sqlite3"

DATABASES = {
    "default": config("DATABASE_URL", default=default_dburl, cast=dburl),
}
