from django.urls import path

from veredict.api.v1.image_processing.views import (
    ProcessingListView,
    ProcessingImageListCreateView,
)

urlpatterns = [
    path(
        "processings/",
        ProcessingListView.as_view(),
        name="processing",
    ),
    path(
        "processings/<int:processing_pk>/processing-images/",
        ProcessingImageListCreateView.as_view(),
        name="processing-image",
    ),
]
