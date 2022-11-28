from rest_framework import generics
from .models import Notes, NotesLikes
from .serializers import *

from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser

from django.db.models import Count

class NoteCreateView(generics.CreateAPIView):
    parser_classes = (MultiPartParser, FormParser)
    serializer_class = NotesSerializer

class UserNotesView(generics.ListAPIView):
    serializer_class = NotesSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.kwargs['pk']
        return Notes.objects.filter(user=user)

class NotesCategoriesView(generics.ListAPIView):
    queryset = Categories.objects.all().annotate(ids=Count('notes__id')).order_by('-ids')
    serializer_class = NotesCategoriesSerializer

class NotesListView(generics.ListAPIView):
    serializer_class = NotesSerializer
    def get_queryset(self):
        c = self.request.GET.get('c')
        notes = Notes.objects.filter(is_verified=True).filter(category__name=c).annotate(ids=Count('noteslikes__id')).order_by('-ids')
        return notes

class NoteLikeView(generics.CreateAPIView):
    queryset = NotesLikes.objects.all()
    serializer_class = NoteLikeSerializer

class RemoveNoteLikeView(generics.DestroyAPIView):
    queryset = NotesLikes.objects.all()
    serializer_class = NoteLikeSerializer

