from django.http import HttpResponse
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework.views import APIView

from veredict.api.v1.image_processing.serializers import (
    ProcessingImageInputSerializer,
    ProcessingOutputSerializer,
    ImageMetadataOutputSerializer,
    ImageMetadataInputSerializer,
    ProcessingImageCreateOutputSerializer,
    ProcessingImageListOutputSerializer,
)
from veredict.image_processing.models import (
    Processing,
    ProcessingImage,
    ImageMetadata,
)
from veredict.image_processing.services.image_processing import (
    get_processing_tokens,
)
from veredict.image_processing.tasks import parse_processing_image


class ProcessingListView(APIView):
    def get(self, request, *args, **kwargs):
        queryset = Processing.objects.all().order_by("-created_at")
        serializer = ProcessingOutputSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        instance = Processing.objects.create()
        return Response({"id": instance.pk}, status=status.HTTP_201_CREATED)


class ProcessingTokensListView(APIView):
    def get(self, request, processing_pk, *args, **kwargs):
        processing = Processing.objects.get(pk=processing_pk)
        tokens = get_processing_tokens(processing)
        content = "\n".join(tokens)

        return HttpResponse(content, content_type="text/plain")


class ProcessingImageListCreateView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, processing_pk):
        input_serializer = ProcessingImageInputSerializer(data=request.data)
        input_serializer.is_valid(raise_exception=True)
        processing = Processing.objects.get(pk=processing_pk)
        instance = input_serializer.save(processing=processing)

        parse_processing_image.delay_on_commit(instance.pk)

        output_serializer = ProcessingImageCreateOutputSerializer(
            instance=instance
        )
        return Response(output_serializer.data, status=status.HTTP_201_CREATED)

    def get(self, request, processing_pk, *args, **kwargs):
        processing = Processing.objects.get(pk=processing_pk)
        queryset = ProcessingImage.objects.filter(processing=processing)

        output_serializer = ProcessingImageListOutputSerializer(
            queryset, many=True
        )
        return Response(output_serializer.data, status=status.HTTP_200_OK)


class ImageMetadataListView(APIView):
    def get(self, request, processing_image_pk, *args, **kwargs):
        """Retrieve ImageMetadata for a given ProcessingImage"""
        processing_image = get_object_or_404(
            ProcessingImage.objects.all(), pk=processing_image_pk
        )
        image_metadata = ImageMetadata.objects.filter(
            processing_image=processing_image
        )

        serializer = ImageMetadataOutputSerializer(image_metadata, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class ImageMetadataUpdateView(APIView):
    def patch(
        self, request, processing_image_pk, image_metadata_pk, *args, **kwargs
    ):
        """Partially update ImageMetadata fields"""
        processing_image = get_object_or_404(
            ProcessingImage.objects.all(), pk=processing_image_pk
        )
        instance = processing_image.metadata.get(pk=image_metadata_pk)

        serializer = ImageMetadataInputSerializer(
            instance, data=request.data, partial=True
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()
        output_serializer = ImageMetadataOutputSerializer(instance)

        return Response(output_serializer.data, status=status.HTTP_200_OK)
