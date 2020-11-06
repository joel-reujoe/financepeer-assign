from django.db import models

# Create your models here.

def upload_files(instance, filename):
    return '/'.join(['file',filename])
    pass

class Article(models.Model):
    userId = models.IntegerField()
    title = models.CharField(max_length=120)
    body = models.TextField()

    def __str__(self):
        return self.title




