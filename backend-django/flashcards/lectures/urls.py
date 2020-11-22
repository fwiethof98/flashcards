from django.urls import path

from .views import (
    lecture_create_api_view,
    lecture_search_api_view,
    lecture_assign_api_view,
    study_create_api_view,
    study_search_api_view,
    study_assign_api_view
)

urlpatterns = [
    path('lecture/create', lecture_create_api_view),
    path('lecture/assign', lecture_assign_api_view),
    path('lecture/search', lecture_search_api_view),
    path('study/create', study_create_api_view),
    path('study/search', study_search_api_view),
    path('study/assign', study_assign_api_view)
]
