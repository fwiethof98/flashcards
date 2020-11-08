from django.urls import path

from .views import (
    card_detail_api_view,
    card_list_api_view,
    card_create_api_view,
    card_delete_api_view,
    card_action_api_view,
    card_upload_api_view
)

urlpatterns = [
    path('<int:card_id>/', card_detail_api_view),
    path('list/', card_list_api_view),
    path('create/', card_create_api_view),
    path('<int:card_id>/delete/', card_delete_api_view),
    path('action/', card_action_api_view),
    path('upload/', card_upload_api_view),
]
