from veredict.celery.app import celery_app


@celery_app.task(name='processing_image')
def process_image(processing_image_pk: int): ...
