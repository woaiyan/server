from django.urls import path
from .app import svg, file, memorandum, article

urlpatterns = [
    path('waiyan/svg/<int:pk>/', svg.SvgView.as_view({'delete': 'delete'})),
    path('waiyan/svg/', svg.SvgView.as_view({'get': 'get', 'post': 'post'})),
    path('waiyan/file/upload/', file.fileHandle.as_view({'post': 'post'})),
    path('waiyan/file/upload/<int:pk>/', file.fileHandle.as_view({'delete': 'delete'})),
    path('waiyan/file/downfile/<int:pk>/', file.fileHandle.as_view({'get': 'downfile'})),
    path('waiyan/file/exsit/<int:pk>/', file.fileHandle.as_view({'head': 'head'})),
    path('waiyan/file/list/', file.fileHandle.as_view({'get': 'list'})),
    path('waiyan/memorandum/category/', memorandum.MemorandumCategoryHandle.as_view({'get': 'get', 'post': 'post'})),
    path('waiyan/memorandum/category/<int:pk>/', memorandum.MemorandumCategoryHandle.as_view({'delete': 'delete'})),
    path('waiyan/memorandum/', memorandum.MemorandumHandle.as_view({'post': 'post'})),
    path('waiyan/memorandum/<int:pk>/', memorandum.MemorandumHandle.as_view({'get': 'get', 'delete': 'delete', 'put': 'update'})),
    path('waiyan/memorandum/detail/<int:pk>/', memorandum.MemorandumHandle.as_view({'get': 'handleDetail'})),
    path('waiyan/article/dir/', article.AritlceHandle.as_view({'get': 'get'})),
    path('waiyan/article/file/content/', article.AritlceHandle.as_view({'get': 'handleDetail'}))
]
