from django.urls import path
from . import views

urlpatterns = [
    path('api/flashlists/user/<pk>', views.UserFlashlistsView.as_view()),
    path('api/flashlists/create', views.FlashlistCreateView.as_view()),
    path('api/flashlists/delete/<pk>', views.FlashlistDeleteView.as_view()),
    path('api/flashlists/add', views.AddFlashcardToFlashlistView.as_view()),
    path('api/flashlists/remove', views.RemoveFlashcardFromFlashlistView.as_view()),
    path('api/flashlists/<pk>', views.FlashlistUpdateNameView.as_view()),
    path('api/flashlists/random', views.RandomFlashlistFlashcard.as_view()),
]