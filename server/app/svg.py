from django.http import HttpResponse
from rest_framework.parsers import JSONParser
from rest_framework.viewsets import GenericViewSet

from modals.models import Svg
from modals.serializers import SvgSerializer, QuerySerializer
from .result import JSONResponse, MyPagination


class SvgView(GenericViewSet):
    serializer_class = SvgSerializer
    pagination_class = MyPagination

    def get(self, request):
        serializer = QuerySerializer(data=request.query_params)
        if not serializer.is_valid():
            return JSONResponse(data=serializer.errors)
        page = MyPagination()
        queryset = Svg.objects.all()
        datas = page.paginate_queryset(queryset, request=request, view=self)
        result = {
            'result': SvgSerializer(datas.get('data'), many=True).data,
            'max_page': datas.get('max_page'),
            'next_page': datas.get('next'),
            'pre_page': datas.get('pre'),
            'total': datas.get('total'),
            'page': datas.get('page')

        }
        return JSONResponse(result)

    def post(self, request):
        data = JSONParser().parse(request)
        serializer = SvgSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JSONResponse(serializer.data, code=200, message="创建成功")
        return JSONResponse(serializer.errors, code=400, message="缺少参数")

    def delete(self, request, pk=None):

        try:
            svg = Svg.objects.get(pk=pk)
        except Svg.DoesNotExist:
            return HttpResponse(status=404)
        svg.delete()
        return JSONResponse(None, status=200, message="删除成功")
