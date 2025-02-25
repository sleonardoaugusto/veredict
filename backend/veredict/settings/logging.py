import os
from django.conf import settings

# Define log directory path
LOG_DIR = os.path.join(settings.BASE_DIR, "logs")

# Ensure the log directory exists
os.makedirs(LOG_DIR, exist_ok=True)

LOGGING = {
    "version": 1,
    "disable_existing_loggers": True,
    "formatters": {
        "verbose": {
            "format": "{asctime}.{msecs:0<3.0f}Z | {levelname} | {name} | {filename}:{funcName}:{lineno} | {message}",
            "style": "{",
        },
    },
    "handlers": {
        # Logs to a local file
        "file": {
            "level": "INFO",
            "class": "logging.FileHandler",
            "filename": os.path.join(
                LOG_DIR, "veredict.log"
            ),  # Ensures log file is created
            "formatter": "verbose",
        },
        # Logs to the console (useful for development)
        "console": {
            "level": "DEBUG",
            "class": "logging.StreamHandler",
            "formatter": "verbose",
        },
    },
    "loggers": {
        "veredict": {
            "handlers": ["file", "console"],
            "level": "DEBUG" if settings.DEBUG else "INFO",
            "propagate": False,
        },
    },
}
