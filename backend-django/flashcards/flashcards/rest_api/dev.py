from rest_framework import authentication
from django.contrib.auth.models import User


class DevAuthentication(authentication.BasicAuthentication):
    def authenticate(self, request):
        qs = User.objects.all()
        user = qs.filter(username="fwiethof").first()
        return (user, None)
