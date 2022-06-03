from abc import ABC

from rest_framework import serializers

from modals.models import Svg, Note, NoteCategory, File


class SvgSerializer(serializers.ModelSerializer):
    class Meta:
        model = Svg
        fields = '__all__'


class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = '__all__'


class NoteCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = NoteCategory
        fields = ('id', 'name')


class NoteCategoryDetailSerializer(serializers.ModelSerializer):
    notes = NoteSerializer(many=True)

    class Meta:
        model = NoteCategory
        fields = ('id', 'name', 'notes')


class FileUploadSerializer(serializers.ModelSerializer):
    class Meta:
        model = File
        fields = '__all__'


class FileListSerializer(serializers.ModelSerializer):
    class Meta:
        model = File
        fields = ('id', 'name', 'time')


class QuerySerializer(serializers.Serializer):
    def create(self, validated_data):
        return None

    def update(self, instance, validated_data):
        return None

    page = serializers.IntegerField(min_value=1, allow_null=False, required=True)
    size = serializers.IntegerField(min_value=10, max_value=100, allow_null=False, required=True)
    search = serializers.CharField(allow_blank=True, allow_null=True, required=True)
