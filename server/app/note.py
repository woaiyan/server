from django.http import HttpResponse
from rest_framework.parsers import JSONParser

from server.app.result import JSONResponse
from modals.models import Note, NoteCategory
from modals.serializers import NoteSerializer, NoteCategorySerializer, NoteCategoryDetailSerializer
from rest_framework.viewsets import GenericViewSet


class NoteCategoryHandle(GenericViewSet):
    def get(self, request):
        queryset = NoteCategory.objects.all()
        datas = NoteCategorySerializer(queryset, many=True)
        result = {
            'result': datas.data,

        }
        return JSONResponse(result)

    def post(self, request):
        data = JSONParser().parse(request)
        serializer = NoteCategorySerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JSONResponse(serializer.data, code=200, message="创建成功")
        return JSONResponse(serializer.errors, code=400, message="缺少参数")

    def delete(self, request, pk=None):
        try:
            noteCategory = NoteCategory.objects.get(pk=pk)
            noteCategory.delete()
            return JSONResponse(None, status=200, message="删除成功")
        except NoteCategory.DoesNotExist:
            return HttpResponse(status=404)

    def put(self, request, pk=None):
        data = JSONParser().parse(request)
        try:
            noteCategory = NoteCategory.objects.get(pk=pk)
            noteCategory.name = data.get("name")
            noteCategory.save()
            return JSONResponse(NoteCategorySerializer(noteCategory).data, code=200, message="修改成功")
        except NoteCategory.DoesNotExist:
            return HttpResponse(status=404)

    def info(self, request, pk=None):
        try:
            noteCategory = NoteCategory.objects.get(pk=pk)
            serializer = NoteCategoryDetailSerializer(noteCategory)

            return JSONResponse(serializer.data, code=200, message="修改成功")
        except NoteCategory.DoesNotExist:
            return HttpResponse(status=404)

    def createNote(self, request):
        data = JSONParser().parse(request)
        serializer = NoteSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JSONResponse(serializer.data, code=200, message="创建成功")
        return JSONResponse(serializer.errors, code=400, message="缺少参数")

    def updateNote(self, request, pk=None):
        data = JSONParser().parse(request)
        try:
            note = Note.objects.get(pk=pk)
            note.content = data.get("content")
            note.save()
            return JSONResponse(NoteSerializer(note).data, code=200, message="修改成功")
        except Note.DoesNotExist:
            return HttpResponse(status=404)


    def deleteNote(self, request, pk=None):
        try:
            note = Note.objects.get(pk=pk)
            note.delete()
            return JSONResponse(None, status=200, message="删除成功")
        except Note.DoesNotExist:
            return HttpResponse(status=404)

