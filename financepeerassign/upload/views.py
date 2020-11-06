from upload.models import Files
from rest_framework import viewsets
from .serializer import FileSerializer
from django.core import serializers
from django.http import HttpResponse
from rest_framework.parsers import FileUploadParser
import json
import os
from articles.models import Article
import glob




class JsonUploadParser(FileUploadParser):
    media_type = 'application/json'
    
class FilesViewSet(viewsets.ModelViewSet):
    queryset = Files.objects.all()
    serializer_class = FileSerializer
    parser_class = (JsonUploadParser)

    def save_data_in_db(self,filename):
        list_of_files = glob.glob(os.getcwd()+('\\financepeerassign\\upload\\files\\*'))
        latest_file = max(list_of_files, key=os.path.getctime)
        f = open(latest_file)
        data = json.load(f)
        valid_json = data != None and data != []
        invalid_json = False
        if valid_json:
            for data_item in data:
                if "userId" in data_item and "title" in data_item and "body" in data_item:
                    a = Article(userId = data_item["userId"], title = data_item["title"], body=data_item["body"])
                    a.save()
                else:
                    invalid_json = True
                    break
        else:
            invalid_json = True
        
        return not invalid_json
        
    



    def upload_file(self, request, format=None):
        if 'file' not in request.data:
            return HttpResponse("empty")
        f = request.data['file']
        b = Files(filename = f.name, file=f)
        b.save()        
        json_valid = self.save_data_in_db(f.name)
        if json_valid:
            return HttpResponse("File uploaded successfully",status=200)
        else:
            return HttpResponse("Invalid json data", status=200)
    