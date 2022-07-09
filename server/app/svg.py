import json

from django.http import HttpResponse
from rest_framework.parsers import JSONParser
from rest_framework.viewsets import GenericViewSet
import requests
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
        params = {'content': data.get('content')}
        data_json = json.dumps(params)
        headers = {'Content-type': 'application/json'}
        response = requests.post("http://127.0.0.1:8888/svg/optimise/", data=data_json, headers=headers)
        if response.status_code != 200:
            return JSONResponse(response.json(), code=400, message="svg优化失败")
        data["content"] = response.json().get('data')
        serializer = SvgSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JSONResponse(serializer.data, code=200, message="创建成功")
        return JSONResponse(serializer.errors, code=400, message="创建失败")

    def delete(self, request, pk=None):

        try:
            svg = Svg.objects.get(pk=pk)
        except Svg.DoesNotExist:
            return HttpResponse(status=404)
        svg.delete()
        return JSONResponse(None, status=200, message="删除成功")
