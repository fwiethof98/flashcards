from rest_framework import serializers
from .models import UserProfile, Role


class UserProfileSerializer(serializers.ModelSerializer):
    username = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = UserProfile
        fields = ['username']

    def get_username(self, obj):
        return obj.user.get_username()


class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = ['name']


class RoleDistributionSerializer(serializers.Serializer):
    action = serializers.CharField()
    role = serializers.CharField()
    username = serializers.CharField()
