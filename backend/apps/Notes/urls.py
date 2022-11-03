from django.urls import path
from . import views

urlpatterns = [
    path('api/notes', views.NotesListCreateView.as_view()),
    path('api/notes/<pk>', views.NotesRetrieveUpdateDestroyView.as_view()),
    path('api/notes/user/<pk>', views.UserNotesView.as_view()),
]