from django.urls import path

from .views import (
    role_assign_api_view,
    role_create_api_view,
    user_delete_api_view,
    user_search_api_view,
    role_search_api_view,
)

urlpatterns = [
    path('users/', user_search_api_view),
    path('users/delete', user_delete_api_view),
    path('roles/', role_search_api_view),
    path('roles/create', role_create_api_view),
    path('roles/assign', role_assign_api_view),
]
