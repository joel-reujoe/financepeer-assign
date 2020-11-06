from django.urls import path, include

from .views import FilesViewSet

urlpatterns = [
    path('',FilesViewSet.as_view({'post':'upload_file'}))    
]