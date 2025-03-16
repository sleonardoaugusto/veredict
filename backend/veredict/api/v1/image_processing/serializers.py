from rest_framework import serializers

from veredict.image_processing.models import (
    ProcessingImage,
    Processing,
    ImageMetadata,
)


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


class ImageMetadataOutputSerializer(serializers.ModelSerializer):
    class Meta:
        ref_name = "ImageMetadataOutput"
        model = ImageMetadata
        fields = (
            "processing_image",
            "ocr_code_1",
            "date_1",
            "city_1",
            "ocr_code_2",
            "date_2",
            "city_2",
            "ocr_code_3",
            "date_3",
            "city_3",
        )
