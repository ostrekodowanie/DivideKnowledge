from rest_framework import generics
from .models import *
from .serializers import *

from rest_framework.permissions import IsAuthenticated

class NotesListCreateView(generics.CreateAPIView):
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

