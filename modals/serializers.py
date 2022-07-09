from abc import ABC

from rest_framework import serializers

from modals.models import Svg, File, MemorandumCategory, Memorandum


class SvgSerializer(serializers.ModelSerializer):
    class Meta:
        model = Svg
        fields = '__all__'

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


class MemorandumSerializer(serializers.ModelSerializer):
    class Meta:
        model = Memorandum
        fields = ('id', 'name', 'time', 'category')


class MemorandumCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Memorandum
        fields = ('name', 'category')

class MemorandumCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = MemorandumCategory
        fields = '__all__'


class MemorandumDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Memorandum
        fields = '__all__'
