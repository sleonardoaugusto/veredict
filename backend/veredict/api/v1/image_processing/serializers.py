from rest_framework import serializers

from veredict.image_processing.models import ProcessingImage, Processing


class ProcessingOutputSerializer(serializers.ModelSerializer):
    class Meta:
        ref_name = "ProcessingImageOutput"
        model = Processing
        fields = ("created_at", "id")


class ProcessingImageInputSerializer(serializers.ModelSerializer):
    class Meta:
        ref_name = "ProcessingImageCreateInput"
        model = ProcessingImage
        fields = ("id", "image")


class ProcessingImageOutputSerializer(serializers.ModelSerializer):
    class Meta:
        ref_name = "ProcessingImageOutput"
        model = ProcessingImage
        fields = ("id", "processing", "image")
