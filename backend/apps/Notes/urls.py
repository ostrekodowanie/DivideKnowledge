from django.urls import path
from . import views

urlpatterns = [
    path('api/notes/create', views.NoteCreateView.as_view()),
    path('api/notes/categories', views.NotesCategoriesView.as_view()),
    path('api/notes', views.NotesListView.as_view()),
    path('api/notes/like/add', views.NoteLikeView.as_view()),
    path('api/notes/like/remove/<u>/<n>', views.RemoveNoteLikeView.as_view()),
    path('api/notes/user/<pk>', views.UserNotesView.as_view()),
]