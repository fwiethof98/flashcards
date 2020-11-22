from django.db import models
from django.conf import settings
from django.db.models.fields.related import ManyToManyField

User = settings.AUTH_USER_MODEL


class CardLike(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    card = models.ForeignKey("Card", on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)


class Card(models.Model):
    user = models.ForeignKey(User, null=True, on_delete=models.CASCADE)
    likes = models.ManyToManyField(
        User, related_name='card_user', blank=True)
    question = models.TextField(blank=True, null=True)
    answer = models.TextField(blank=True, null=True)
    time = models.DateTimeField(auto_now_add=True)
    lecture = models.TextField(blank=True, null=True)

    class Meta:
        ordering = ["-id"]
# Create your models here.
