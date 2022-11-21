from django.urls import path
from . import views

urlpatterns = [
    path('api/flashcards/verify', views.FlashcardsVerifyView.as_view()),
]