import os

from django.http import FileResponse
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet
from server.app.result import JSONResponse
from modals.models import File
from modals.serializers import FileUploadSerializer, FileListSerializer


class fileHandle(GenericViewSet):

    def post(self, request):
        data = {
            'file': request.FILES['file'],
            'name': request.FILES['file'].name
        }
        form = FileUploadSerializer(data=data)
        if form.is_valid():
            form.save()
            return JSONResponse(data=form.data, message='上传成功')
        return JSONResponse(data=form.errors, message='上传失败', code=400)



    def delete(self, request, pk=None):
        try:
            file = File.objects.get(pk=pk)
            file.file.delete()
            file.delete()
            return JSONResponse(data=None, message='删除成功')
        except File.DoesNotExist:
            return JSONResponse(data=None, message='不存在的资源', code=404)

    def head(self, request, pk=None):
        try:
            File.objects.get(pk=pk)
            return Response(status=200)
        except File.DoesNotExist:
            return Response(status=404)

    def downfile(self, request, pk=None):
        try:
            file = File.objects.get(pk=pk)
            response = FileResponse(file.file)
            arr = os.path.basename(file.file.name).split('.')
            ext = arr[-1]
            if len(arr) > 2:
                filename = '.'.join(str(item) for item in arr[0:-2])
            else:
                filename = arr[0]
            response['content_type'] = "application/octet-stream"
            response['Content-Disposition'] = 'attachment; filename=' + '{}.{}'.format(filename, ext)
            return response
        except File.DoesNotExist:
            return JSONResponse(data=None, message='不存在的资源', code=404)

    def list(self, request):
        files = File.objects.all()
        return JSONResponse(data=FileListSerializer(files, many=True).data)
