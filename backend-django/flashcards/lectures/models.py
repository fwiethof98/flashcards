from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class Study(models.Model):
    name = models.TextField(blank=True)
    students = models.ForeignKey(User, null=True, on_delete=models.CASCADE)


class Lecture(models.Model):
    name = models.TextField(blank=True)
    study = models.ForeignKey(Study, null=True, on_delete=models.CASCADE)
    students = models.ForeignKey(User, null=True, on_delete=models.CASCADE)
