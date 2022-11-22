from django.urls import path
from . import views

urlpatterns = [
    path('api/flashlists/user/<pk>', views.UserFlashlistsView.as_view()),
]