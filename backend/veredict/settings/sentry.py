import sentry_sdk
from decouple import config
from sentry_sdk.integrations.django import DjangoIntegration

SENTRY_DSN = config("SENTRY_DSN", default=None)

if SENTRY_DSN:
    sentry_sdk.init(
        dsn=SENTRY_DSN,
        integrations=[DjangoIntegration()],
        traces_sample_rate=1.0,
        send_default_pii=True,
    )
