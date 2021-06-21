from django.db import models

# Create your models here.
class Videos(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=200)
    uploadedby = models.CharField(max_length=60)
    url = models.TextField(max_length=400)

    def __str__(self):
        return self.title
