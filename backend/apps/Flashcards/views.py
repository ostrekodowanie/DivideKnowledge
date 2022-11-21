from .models import *
from .serializers import *

from rest_framework.views import APIView
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from django.db.models import Count
from django.db.models import Q

class FlashcardCreateView(generics.CreateAPIView):
    serializer_class = FlashcardCreateSerializer
    queryset = Flashcards.objects.all()

class UserFlashcardsView(generics.ListAPIView):
    serializer_class = FlashcardsSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.kwargs['pk']
        return Flashcards.objects.filter(user=user)

class CategoriesListView(generics.ListAPIView):
    queryset = Categories.objects.all().annotate(ids=Count('flashcards__id')).order_by('-ids')
    serializer_class = CategoriesListSerializer

class CategoryFilterView(generics.ListAPIView):
    serializer_class = FlashcardsSerializer
    def get_queryset(self):
        c = self.request.GET.get('c')
        if c:
            categories = Flashcards.objects.filter(category__name=c).order_by('?')[:1]
            return categories

        return Flashcards.objects.all()

    
    