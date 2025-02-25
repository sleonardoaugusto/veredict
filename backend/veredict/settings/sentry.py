import sentry_sdk
from sentry_sdk.integrations.django import DjangoIntegration

sentry_sdk.init(
    dsn="https://fff76d9a6f834c89a5fa059e4d1b9f3c@o346271.ingest.sentry.io/5721647",
    integrations=[DjangoIntegration()],
    traces_sample_rate=1.0,
    send_default_pii=True,
)
