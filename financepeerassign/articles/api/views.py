from rest_framework.generics import ListAPIView, RetrieveAPIView
from articles.models import Article
from .serializer import ArticleSerialize
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.viewsets import ModelViewSet
from rest_framework.exceptions import ParseError
from rest_framework.parsers import FileUploadParser
from rest_framework.response import Response
from rest_framework.views import APIView


class ArticleListView(ListAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerialize


class JsonUploadParser(FileUploadParser):
    media_type = 'application/json'


