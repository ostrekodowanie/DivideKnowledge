from django.urls import path
from . import views

urlpatterns = [
<<<<<<< HEAD
    path('api/flashcards', views.FlashcardsListCreateView.as_view()),
=======
    path('api/flashcards', views.FlashcardsListView.as_view()),
>>>>>>> d169fc24b86a22d81980091a83440a448135d396
    path('api/flashcards/<pk>', views.FlashcardsRetrieveUpdateDestroyView.as_view()),
    path('api/flashcards/user/<pk>', views.UserFlashcardsView.as_view()),
]