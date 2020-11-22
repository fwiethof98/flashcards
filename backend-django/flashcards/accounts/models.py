from django.db import models
from django.conf import settings
from django.db.models.fields.related import ManyToManyField
from django.db.models.signals import post_save

User = settings.AUTH_USER_MODEL


class Role(models.Model):
    name = models.TextField()
    time = models.DateTimeField(auto_now_add=True)

    def get_name(self, obj):
        return obj.name


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    role = ManyToManyField(Role)


def create_user_profile(sender, instance, created, **kwargs):
    if created:
        profile, created = UserProfile.objects.get_or_create(user=instance)


post_save.connect(create_user_profile, sender=User)
