from django.urls import path
from .app import svg, note, file

urlpatterns = [
    path('waiyan/svg/<int:pk>/', svg.SvgView.as_view({'delete': 'delete'})),
    path('waiyan/svg/', svg.SvgView.as_view({'get': 'get', 'post': 'post'})),
    path('waiyan/note/category/', note.NoteCategoryHandle.as_view({'get': 'get', 'post': 'post'})),
    path('waiyan/note/category/<int:pk>/', note.NoteCategoryHandle.as_view({'put': 'put', 'delete': 'delete'})),
    path('waiyan/note/category/list/<int:pk>/', note.NoteCategoryHandle.as_view({'get': 'info'})),
    path('waiyan/note/category/create/', note.NoteCategoryHandle.as_view({'post': 'createNote'})),
    path('waiyan/note/category/delete/<int:pk>/', note.NoteCategoryHandle.as_view({'delete': 'deleteNote'})),
    path('waiyan/file/upload/', file.fileHandle.as_view({'post': 'post'})),
    path('waiyan/file/upload/<int:pk>/', file.fileHandle.as_view({'delete': 'delete'})),
    path('waiyan/file/downfile/<int:pk>/', file.fileHandle.as_view({'get': 'downfile'})),
    path('waiyan/file/exsit/<int:pk>/', file.fileHandle.as_view({'head': 'head'})),
    path('waiyan/file/list/', file.fileHandle.as_view({'get': 'list'}))
]
