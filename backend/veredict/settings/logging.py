from django.conf import settings


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
