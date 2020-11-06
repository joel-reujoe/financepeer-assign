from upload.models import Files
from rest_framework import viewsets
from .serializer import FileSerializer
from django.core import serializers
from django.http import HttpResponse
from rest_framework.parsers import FileUploadParser
import json
import os
from articles.models import Article



class JsonUploadParser(FileUploadParser):
    media_type = 'application/json'
    
class FilesViewSet(viewsets.ModelViewSet):
    queryset = Files.objects.all()
    serializer_class = FileSerializer
    parser_class = (JsonUploadParser)

    def save_data_in_db(self,filename):
        Article.objects.all().delete()
        if "(" in filename and ")" in filename:
            if "(" in filename:
                name = filename.replace(" ","")
                name_change = name.replace("(","_")
            if ")" in name_change:
                name_final = name_change.replace(")","")
            f = open(os.getcwd()+('\\financepeerassign\\upload\\files\\'+name_final))
            data = json.load(f)
        else:
            f = open(os.getcwd()+('\\financepeerassign\\upload\\files\\'+filename))
            data = json.load(f)
            
        for data_item in data:
           a = Article(userId = data_item["userId"], title = data_item["title"], body=data_item["body"])
           a.save()



    def upload_file(self, request, format=None):
        if 'file' not in request.data:
            return HttpResponse("empty")
        f = request.data['file']
        b = Files(filename = f.name, file=f)
        b.save()        
        self.save_data_in_db(f.name)
        return HttpResponse(status=200)
    