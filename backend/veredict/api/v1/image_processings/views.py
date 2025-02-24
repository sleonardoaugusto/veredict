from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework.views import APIView

from veredict.api.v1.image_processings.serializers import (
    InputProcessingImageCreateSerializer,
    OutputProcessingImageCreateSerializer,
)
from veredict.image_processings.models import Processing
from veredict.image_processings.services.processing import get_processing


class ProcessingDetail(APIView):

    def post(self, request):
        instance = Processing.objects.create()
        return Response({'id': instance.pk}, status=status.HTTP_201_CREATED)


class ProcessingImageDetail(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, processing_pk):
        input_serializer = InputProcessingImageCreateSerializer(data=request.data)
        input_serializer.is_valid(raise_exception=True)
        instance = input_serializer.save(processing=get_processing(processing_pk))

        output_serializer = OutputProcessingImageCreateSerializer(instance=instance)
        return Response(output_serializer.data, status=status.HTTP_201_CREATED)
