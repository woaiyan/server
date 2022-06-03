from django.http import HttpResponse
from rest_framework.renderers import JSONRenderer
from rest_framework.pagination import PageNumberPagination
import math


class MyPagination(PageNumberPagination):
    page_size = 10
    page_query_param = 'page'
    page_size_query_param = 'size'
    max_page_size = 100

    def paginate_queryset(self, queryset, request, view=None):
        max_page = math.ceil(len(queryset) / self.get_page_size(request=request))
        page = int(self.get_page_number(request=request, paginator=self))
        pre_page = page - 1
        next_page = page + 1
        if page > max_page:
            pre_page = max_page
            next_page = None
            return {
                'max_page': max_page,
                'data': [],
                'next': next_page,
                'pre': pre_page,
                'total': 0,
                'page': page
            }
        if page < 1:
            next_page = 1
            pre_page = None
            return {
                'max_page': max_page,
                'data': [],
                'next': next_page,
                'pre': pre_page,
                'total': 0,
                'page': page
            }
        else:
            if next_page > max_page:
                next_page = None
            if pre_page < 1:
                pre_page = None
            return {
                'max_page': max_page,
                'data': super().paginate_queryset(queryset, request, view=self),
                'next': next_page,
                'pre': pre_page,
                'total': len(queryset),
                'page': page
            }


class JSONResponse(HttpResponse):
    def __init__(self, data, code=200, message="成功", **kwargs):
        content = {'data': data, 'code': code, 'message': message}
        kwargs['content_type'] = 'application/json'
        super(JSONResponse, self).__init__(JSONRenderer().render(content), **kwargs)
