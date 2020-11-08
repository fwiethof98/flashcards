"""flashcards URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.views.generic import TemplateView
from django.urls import path
from django.urls import include


from accounts.views import (
    login_view,
    logout_view,
    register_view
)

from cards.views import (
    cards_list_view,
    cards_detail_view,
    cards_profile_view,
    cards_test_view,
    cards_upload_view
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', cards_list_view),
    path('login/', login_view),
    path('logout/', logout_view),
    path('register/', register_view),
    path('cards/<int:card_id', cards_detail_view),
    path('cards/<str:username>', cards_profile_view),
    path('test/', cards_test_view),
    path('upload/', cards_upload_view),
    path('api/cards/', include('cards.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL,
                          document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)
