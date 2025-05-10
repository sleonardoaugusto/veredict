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
        fields = ("created_at", "id", "status")


class ProcessingImageInputSerializer(serializers.ModelSerializer):
    class Meta:
        ref_name = "ProcessingImageCreateInput"
        model = ProcessingImage
        fields = ("id", "image")


class ImageMetadataOutputSerializer(serializers.ModelSerializer):
    class Meta:
        ref_name = "ImageMetadataOutput"
        model = ImageMetadata
        fields = (
            "id",
            "ocr_code",
            "date",
            "city",
            "ocr_code_flag",
            "city_flag",
            "position",
        )


class ImageMetadataInputSerializer(serializers.ModelSerializer):
    class Meta:
        ref_name = "ImageMetadataInput"
        model = ImageMetadata
        fields = (
            "ocr_code",
            "date",
            "city",
        )


class ProcessingImageCreateOutputSerializer(serializers.ModelSerializer):
    class Meta:
        ref_name = "ProcessingImageOutput"
        model = ProcessingImage
        fields = ("id", "processing", "image")


class ProcessingImageListOutputSerializer(serializers.ModelSerializer):
    class Meta:
        ref_name = "ProcessingImageOutput"
        model = ProcessingImage
        fields = ("id", "processing", "image")
