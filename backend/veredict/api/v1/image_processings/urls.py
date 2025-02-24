from django.urls import path

from veredict.api.v1.image_processings.views import (
    ProcessingDetail,
    ProcessingImageDetail,
)

urlpatterns = [
    path(
        'processings/',
        ProcessingDetail.as_view(),
        name='processing',
    ),
    path(
        'processings/<int:processing_pk>/images/',
        ProcessingImageDetail.as_view(),
        name='processing-image',
    ),
]
