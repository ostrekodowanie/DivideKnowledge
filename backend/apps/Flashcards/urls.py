from django.urls import path
from . import views

urlpatterns = [
    path('api/flashcards/create', views.FlashcardCreateView.as_view()),
    path('api/flashcards/user/<pk>', views.UserFlashcardsView.as_view()),
    path('api/flashcards/categories', views.FlashcardsCategoriesListView.as_view()),
    path('api/flashcards/topics', views.FlashcardsTopicsListView.as_view()),
    path('api/flashcards/filter', views.RandomFlashcardView.as_view()),
]