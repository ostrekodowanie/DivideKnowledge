from rest_framework import generics
from .models import *
from .serializers import *

from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status
from rest_framework.response import Response

class NoteCreateView(generics.GenericAPIView):
    parser_classes = (FormParser, MultiPartParser)
    serializer_class = NotesSerializer
    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        print(serializer)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(status=status.HTTP_201_CREATED)

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

