from rest_framework import generics
from .models import *
from .serializers import *

class NotesListCreateView(generics.ListCreateAPIView):
    queryset = Notes.objects.all()
    serializer_class = NotesSerializer

class NotesRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Notes.objects.all()
    serializer_class = NotesSerializer

