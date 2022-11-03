from .models import *
from .serializers import *

from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

class FlashcardsListCreateView(generics.ListCreateAPIView):
    queryset = Flashcards.objects.all()
    serializer_class = FlashcardsSerializer

class FlashcardsRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Flashcards.objects.all()
    serializer_class = FlashcardsSerializer

class UserFlashcardsView(generics.ListAPIView):
    serializer_class = FlashcardsSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.kwargs['pk']
        return Flashcards.objects.filter(user=user)
    
    