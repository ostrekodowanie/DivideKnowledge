from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from .models import *
from .serializers import *

class UserFlashlistsView(generics.ListAPIView):
    serializer_class = FlashlistsSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.kwargs['pk']
        return Flashlists.objects.filter(user=user)