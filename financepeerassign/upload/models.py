from django.db import models

# Create your models here.

class Files(models.Model):
    filename = models.CharField(max_length=120)
    file = models.FileField(upload_to='files')