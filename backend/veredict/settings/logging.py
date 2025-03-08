import boto3
from decouple import config
from django.conf import settings

# AWS CloudWatch settings
AWS_LOG_GROUP = "django-app"
AWS_LOG_STREAM = "production"

# Environment variable to enable/disable CloudWatch logging
ENABLE_CLOUDWATCH_LOGS = config("WATCHTOWER_LOGS", default=False, cast=bool)

# Define handlers based on the environment variable
handlers = {
    "console": {
        "level": "DEBUG",
        "class": "logging.StreamHandler",
        "formatter": "verbose",
    },
}

if ENABLE_CLOUDWATCH_LOGS:
    handlers["cloudwatch"] = {
        "level": "INFO",
        "class": "watchtower.CloudWatchLogHandler",
        "boto3_client": boto3.client("logs", region_name=config("AWS_REGION")),
        "log_group": AWS_LOG_GROUP,
        "log_stream_name": AWS_LOG_STREAM,
        "formatter": "verbose",
    }

LOGGING = {
    "version": 1,
    "disable_existing_loggers": True,
    "formatters": {
        "verbose": {
            "format": "{asctime}.{msecs:0<3.0f}Z | {levelname} | {name} | {filename}:{funcName}:{lineno} | {message}",
            "datefmt": "%Y-%m-%dT%H:%M:%S",
            "style": "{",
        },
    },
    "handlers": handlers,
    "loggers": {
        "veredict": {
            "handlers": ["console", "cloudwatch"]
            if ENABLE_CLOUDWATCH_LOGS
            else ["console"],
            "level": "DEBUG" if settings.DEBUG else "INFO",
            "propagate": False,
        },
    },
}
