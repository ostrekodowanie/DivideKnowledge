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

class FlashcardsTopicsSearchView(APIView):
    def get(self, request):
        c = self.request.GET.get('c')
        t = self.request.GET.get('t')
        queries = Q(flashcards__is_verified=True)
        if c:
            queries.add(Q(category__name=c), Q.AND)
        if t:
            query=Q()
            for x in t.split():
                query &= Q(name__icontains=x)
            queries.add(Q(query), Q.AND)
        topics = Topics.objects.filter(queries).order_by('name').distinct('name')
        topics_list = []
        for x in topics:
            topics_list.append(x.name)

        return Response(topics_list)


class UserFlashcardsView(generics.ListAPIView):
    serializer_class = FlashcardsSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.kwargs['pk']
        return Flashcards.objects.filter(user=user)

class FlashcardsCategoriesListView(generics.ListAPIView):
    queryset = Categories.objects.all().annotate(ids=Count('topics__id')).order_by('-ids')
    serializer_class = FlashcardsCategoriesListSerializer

class FlashcardsTopicsListView(generics.ListAPIView):
    serializer_class = TopicsSerializer
    def get_queryset(self):
        c = self.request.GET.get('c')
        topics = Topics.objects.filter(flashcards__is_verified=True).filter(category__name=c).annotate(ids=Count('flashcards__id')).order_by('-ids')
        return topics
        
class RandomFlashcardView(generics.ListAPIView):
    serializer_class = FlashcardsSerializer
    def get_queryset(self):
        c = self.request.GET.get('c')
        t = self.request.GET.get('t')
        queries = Q(is_verified=True)
        if c:
            queries.add(Q(topic__category__name=c), Q.AND)
        if t:
            queries.add(Q(topic__name=t), Q.AND)

        return Flashcards.objects.filter(queries).order_by('?')[:1]
    
    
    