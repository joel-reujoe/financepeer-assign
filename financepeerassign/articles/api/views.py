from rest_framework.generics import ListAPIView, RetrieveAPIView
from articles.models import Article
from .serializer import ArticleSerialize


class ArticleListView(ListAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerialize


class ArticleDetailsView(RetrieveAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerialize
