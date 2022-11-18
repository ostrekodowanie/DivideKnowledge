from .models import *
<<<<<<< HEAD
from .serializers import *
=======
from .serializers import FlashcardsSerializer
>>>>>>> d169fc24b86a22d81980091a83440a448135d396

from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

<<<<<<< HEAD
class FlashcardsListCreateView(generics.ListCreateAPIView):
=======
class FlashcardsListView(generics.ListAPIView):
>>>>>>> d169fc24b86a22d81980091a83440a448135d396
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
    
    