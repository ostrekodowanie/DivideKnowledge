from rest_framework import generics
from .models import Notes, NotesLikes
from .serializers import *

from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser

from django.db.models import Count, Exists, OuterRef, Q

from django.utils import timezone
from datetime import timedelta

class NoteCreateView(generics.CreateAPIView):
    parser_classes = (MultiPartParser, FormParser)
    serializer_class = NotesSerializer

class UserNotesView(generics.ListAPIView):
    serializer_class = NotesSerializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        user = self.kwargs['pk']
        return Notes.objects.filter(user=user)

class NotesCategoriesView(generics.ListAPIView):
    queryset = Categories.objects.all().annotate(ids=Count('notes__id')).order_by('-ids')
    serializer_class = NotesCategoriesSerializer

class NotesListView(generics.ListAPIView):
    serializer_class = NotesSerializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        u = self.request.GET.get('u')
        c = self.request.GET.get('c')
        if c:
            notes = (Notes.objects
                .filter(Q(is_verified=True) & Q(category__name=c))
                .annotate(is_liked=Exists(NotesLikes.objects.filter(user=u)))
                .annotate(ids=Count('noteslikes__id'))
                .order_by('-ids'))
            return notes
        return Notes.objects.filter(is_verified=True).annotate(is_liked=Exists(NotesLikes.objects.filter(user=u, note_id=OuterRef('pk')))).annotate(ids=Count('noteslikes__id')).order_by('-ids')

class NoteLikeView(generics.CreateAPIView):
    queryset = NotesLikes.objects.all()
    serializer_class = NoteLikeSerializer

class RemoveNoteLikeView(generics.DestroyAPIView):
    serializer_class = NoteLikeSerializer
    def destroy(self, request, *args, **kwargs):
        user = self.kwargs['u']
        note = self.kwargs['n']
        unlike = NotesLikes.objects.filter(Q(user=user) & Q(note=note))
        unlike.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class RecentPopularNotesView(generics.ListAPIView):
    queryset = (Notes.objects
        .filter(is_verified=True)
        .annotate(recentlikes=Count('pk', filter=Q(noteslikes__created_at__gte=timezone.now()-timedelta(10))))
        .order_by('recentlikes')
        .annotate(ids=Count('noteslikes__id'))
        .order_by('-ids')[:10])
    serializer_class = RecentNotesSerializer

class RecentNotesView(generics.ListAPIView):
    queryset = Notes.objects.filter(is_verified=True).order_by('-created_at')[:10]
    serializer_class = RecentNotesSerializer


