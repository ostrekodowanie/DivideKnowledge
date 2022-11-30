from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response

from django.db.models import Q

from .models import *
from .serializers import (
    FlashlistsSerializer, 
    FlashlistCreateSerializer, 
    AddFlashcardToFlashlistSerializer,
    FlashcardsSerializer,
    FlashlistUpdateNameSerializer)

class UserFlashlistsView(generics.ListAPIView):
    serializer_class = FlashlistsSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.kwargs['pk']
        return Flashlists.objects.filter(user=user)

class FlashlistCreateView(generics.CreateAPIView):
    queryset = Flashlists.objects.all()
    serializer_class = FlashlistCreateSerializer

class FlashlistDeleteView(generics.DestroyAPIView):
    queryset = Flashlists.objects.all()

class AddFlashcardToFlashlistView(generics.CreateAPIView):
    queryset = FlashlistsElements.objects.all()
    serializer_class = AddFlashcardToFlashlistSerializer

class RemoveFlashcardFromFlashlistView(APIView):
    def delete(self, request, *args, **kwargs):
        ids = request.query_params.get('f').split(',')
        queryset = FlashlistsElements.objects.filter(id__in=ids)
        queryset.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class FlashlistUpdateNameView(generics.UpdateAPIView):
    queryset = Flashlists.objects.all()
    serializer_class = FlashlistUpdateNameSerializer

class RandomFlashlistFlashcard(generics.ListAPIView):
    serializer_class = FlashcardsSerializer
    def get_queryset(self):
        id = self.request.GET.get('id')
        return Flashcards.objects.filter(flashlists__flashlist__id=id).order_by('?')[:1]

    