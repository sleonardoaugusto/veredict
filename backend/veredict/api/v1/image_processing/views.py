from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework.views import APIView

from veredict.api.v1.image_processing.serializers import (
    ProcessingImageInputSerializer,
    ProcessingImageOutputSerializer,
    ProcessingOutputSerializer,
    ProcessingImageOutputSerializer,
)
from veredict.image_processing.models import Processing, ProcessingImage
from veredict.image_processing.tasks import parse_processing_image


class ProcessingListView(APIView):
    def get(self, request, *args, **kwargs):
        queryset = Processing.objects.all()
        serializer = ProcessingOutputSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        instance = Processing.objects.create()
        return Response({"id": instance.pk}, status=status.HTTP_201_CREATED)


class ProcessingImageListCreateView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, processing_pk):
        input_serializer = ProcessingImageInputSerializer(data=request.data)
        input_serializer.is_valid(raise_exception=True)
        processing = Processing.objects.get(pk=processing_pk)
        instance = input_serializer.save(processing=processing)

        parse_processing_image.delay_on_commit(instance.pk)

        output_serializer = ProcessingImageOutputSerializer(instance=instance)
        return Response(output_serializer.data, status=status.HTTP_201_CREATED)

    def get(self, request, processing_pk, *args, **kwargs):
        processing = Processing.objects.get(pk=processing_pk)
        queryset = ProcessingImage.objects.filter(processing=processing)

        output_serializer = ProcessingImageOutputSerializer(queryset, many=True)
        return Response(output_serializer.data, status=status.HTTP_200_OK)
