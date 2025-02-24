import os
from celery import Celery

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "veredict.settings")

celery_app = Celery("app")
celery_app.config_from_object("django.conf:settings", namespace="CELERY")

celery_app.conf.task_acks_late = True  # Ensure tasks are not lost if the worker crashes
celery_app.conf.worker_prefetch_multiplier = 1  # Reduce task loss risk

celery_app.autodiscover_tasks()
