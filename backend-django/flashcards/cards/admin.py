from django.contrib import admin

from .models import Card, CardLike


class CardLikeAdmin(admin.TabularInline):
    model = CardLike


admin.site.register(Card)
# Register your models here.
