from rest_framework import generics
from .models import *
from .serializers import *

from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser

class NoteCreateView(generics.CreateAPIView):
    parser_classes = (MultiPartParser, FormParser)
    queryset = Notes.objects.all()
    serializer_class = NotesSerializer

class NotesListView(generics.ListAPIView):
    queryset = Notes.objects.all()
    serializer_class = NotesSerializer

class NotesRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Notes.objects.all()
    serializer_class = NotesSerializer

class UserNotesView(generics.ListAPIView):
    serializer_class = NotesSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.kwargs['pk']
        return Notes.objects.filter(user=user)

