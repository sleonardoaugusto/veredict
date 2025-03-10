from rest_framework import serializers

from veredict.image_processing.models import ProcessingImage, Processing


class OutputProcessingSerializer(serializers.ModelSerializer):
    class Meta:
        ref_name = "ProcessingImageOutput"
        model = Processing
        fields = ("created_at", "id")


class InputProcessingImageCreateSerializer(serializers.ModelSerializer):
    class Meta:
        ref_name = "ProcessingImageCreateInput"
        model = ProcessingImage
        fields = ("id", "image")


class OutputProcessingImageCreateSerializer(serializers.ModelSerializer):
    class Meta:
        ref_name = "ProcessingImageCreateOutput"
        model = ProcessingImage
        fields = ("id", "processing", "image")
