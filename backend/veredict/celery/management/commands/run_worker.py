import shlex
import subprocess

from django.core.management.base import BaseCommand
from django.utils import autoreload


# This should only be run in the local container
def restart_celery(*args, **kwargs):
    kill_worker_cmd = "pkill -9 celery"
    subprocess.call(shlex.split(kill_worker_cmd))  # noqa: S603
    start_worker_cmd = "celery -A veredict worker --loglevel=info"
    subprocess.call(shlex.split(start_worker_cmd))  # noqa: S603


class Command(BaseCommand):
    def handle(self, *args, **options):
        self.stdout.write("Starting celery worker with autoreload...")
        autoreload.run_with_reloader(restart_celery, args=None, kwargs=None)
