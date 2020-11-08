from rest_framework import serializers
from .models import Card
from django.conf import settings

MAX_TEXT_LENGTH = settings.MAX_TEXT_LENGTH
CARD_ACTION_OPTIONS = settings.CARD_ACTION_OPTIONS


class CardActionSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    action = serializers.CharField()

    def validate_action(self, value):
        value = value.lower()
        if not value in CARD_ACTION_OPTIONS:
            raise serializers.ValidationError("Not a valid action")
        return value


class CardSerializer(serializers.ModelSerializer):
    username = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Card
        fields = ['question', 'answer', 'id',
                  'likes', 'username', 'lecture', 'time']

    def validate_question(self, value):
        if len(value) > MAX_TEXT_LENGTH:
            raise serializers.ValidationError("This text is too long!")
        return value

    def get_username(self, obj):
        return obj.user.get_username()
