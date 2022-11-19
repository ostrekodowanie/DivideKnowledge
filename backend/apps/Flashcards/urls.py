from django.urls import path
from . import views

urlpatterns = [
    path('api/flashcards', views.FlashcardsListView.as_view()),
    path('api/flashcards/user/<pk>', views.UserFlashcardsView.as_view()),
    path('api/categories', views.CategoriesListView.as_view()),
    path('api/flashcards/filter', views.CategoryFilterView.as_view()),
]