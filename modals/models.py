import os
import uuid
from django.conf import settings
from django.db import models


class Svg(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100, unique=True)
    content = models.TextField(max_length=100000)



def user_directory_path(instance, filename):
    arr = filename.split('.')
    ext = filename.split('.')[-1]
    name = '.'.join([str(item) for item in arr[0:-1]])
    filename = '{}.{}.{}'.format(name, uuid.uuid4().hex[:10], ext)
    return os.path.join(settings.FILE_DIR, filename)


def user_directory_name(instance, filename):
    return filename


class File(models.Model):
    id = models.AutoField(primary_key=True)
    file = models.FileField(upload_to=user_directory_path, null=False, default='default')
    name = models.CharField(max_length=256, null=False, default='default')
    time = models.DateTimeField(auto_now=True)


class MemorandumCategory(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100, null=False, blank=False, unique=True)

    class Meta:
        db_table = 'memorandum_category'


class Memorandum(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100, null=False, blank=False)
    content = models.TextField(max_length=100000, null=False, blank=True)
    category = models.ForeignKey(to=MemorandumCategory, on_delete=models.CASCADE, related_name='memorandums')
    time = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'memorandum'
        unique_together = ('category', 'name')
        index_together = ('category', 'name')
