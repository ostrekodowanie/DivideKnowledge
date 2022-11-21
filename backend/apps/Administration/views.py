from rest_framework import generics

from apps.Flashcards.models import Flashcards
from .serializers import FlashcardsVerifySerializer

class FlashcardsVerifyView(generics.ListAPIView):
    queryset = Flashcards.objects.filter(is_verified=False)
    serializer_class = FlashcardsVerifySerializer