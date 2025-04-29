from django.urls import path

from veredict.api.v1.image_processing.views import (
    ProcessingListView,
    ProcessingImageListCreateView,
    ImageMetadataUpdateView,
    ImageMetadataListView,
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
    path(
        "processing-images/<int:processing_image_pk>/metadata/",
        ImageMetadataListView.as_view(),
        name="image-metadata-list",
    ),
    path(
        "processing-images/<int:processing_image_pk>/metadata/<int:image_metadata_pk>/",
        ImageMetadataUpdateView.as_view(),
        name="image-metadata-update",
    ),
]
