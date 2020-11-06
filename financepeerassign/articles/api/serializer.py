from rest_framework import serializers
from articles.models import Article

class ArticleSerialize(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = ('userId','title', 'body')
