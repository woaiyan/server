from django.http import HttpResponse
from rest_framework.parsers import JSONParser
from rest_framework.viewsets import GenericViewSet
from modals.models import MemorandumCategory, Memorandum
from modals.serializers import MemorandumSerializer, MemorandumCategorySerializer, MemorandumDetailSerializer, \
    MemorandumCreateSerializer
from server.app.result import JSONResponse


class MemorandumCategoryHandle(GenericViewSet):
    def get(self, request):
        queryset = MemorandumCategory.objects.all().order_by('pk')
        datas = MemorandumCategorySerializer(queryset, many=True)
        result = {
            'result': datas.data,

        }
        return JSONResponse(result)

    def post(self, request):
        data = JSONParser().parse(request)
        serializer = MemorandumCategorySerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JSONResponse(serializer.data, code=200, message="创建成功")
        return JSONResponse(serializer.errors, code=400, message="缺少参数")

    def delete(self, request, pk=None):
        try:
            memorandumCategory = MemorandumCategory.objects.get(pk=pk)
            memorandumCategory.delete()
            return JSONResponse(None, status=200, message="删除成功")
        except MemorandumCategory.DoesNotExist:
            return HttpResponse(status=404)


class MemorandumHandle(GenericViewSet):
    def get(self, request, pk=None):
        queryset = Memorandum.objects.all().filter(category=pk).order_by('pk')
        datas = MemorandumSerializer(queryset, many=True)
        result = {
            'result': datas.data,

        }
        return JSONResponse(result)

    def post(self, request):
        data = JSONParser().parse(request)
        serializer = MemorandumCreateSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JSONResponse(serializer.data, code=200, message="创建成功")
        return JSONResponse(serializer.errors, code=400, message="创建失败")

    def update(self, request, pk=None):
        data = JSONParser().parse(request)
        try:
            note = Memorandum.objects.get(pk=pk)
            note.content = data.get("content")
            note.save()
            return JSONResponse(MemorandumSerializer(note).data, code=200, message="修改成功")
        except Memorandum.DoesNotExist:
            return HttpResponse(status=404)

    def delete(self, request, pk=None):
        try:
            memorandum = Memorandum.objects.get(pk=pk)
            memorandum.delete()
            return JSONResponse(None, status=200, message="删除成功")
        except Memorandum.DoesNotExist:
            return HttpResponse(status=404)

    def handleDetail(self, request, pk=None):
        memorandum = Memorandum.objects.get(pk=pk)
        datas = MemorandumDetailSerializer(memorandum, many=False)
        result = {
            'result': datas.data,

        }
        return JSONResponse(result)
