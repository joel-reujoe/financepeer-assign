from upload.models import Files
from rest_framework import serializers



class FileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Files
        fields = ('filename','file')
