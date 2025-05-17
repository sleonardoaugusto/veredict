from rest_framework import serializers

from veredict.image_processing.models import (
    ProcessingImage,
    Processing,
    ImageMetadata,
)


class ProcessingOutputSerializer(serializers.ModelSerializer):
    created_at = serializers.SerializerMethodField()
    status = serializers.SerializerMethodField()

    class Meta:
        ref_name = "ProcessingOutput"
        model = Processing
        fields = ("created_at", "id", "status")

    def get_created_at(self, obj):
        return obj.created_at.strftime("%d/%m/%Y - %H:%M")

    def get_status(self, instance):
        return instance.status.label


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
        ref_name = "ProcessingImageCreateOutput"
        model = ProcessingImage
        fields = ("id", "processing", "image")


class ProcessingImageListOutputSerializer(serializers.ModelSerializer):
    class Meta:
        ref_name = "ProcessingImageListOutput"
        model = ProcessingImage
        fields = ("id", "processing", "image")
