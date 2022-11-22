from rest_framework import serializers

from .models import Flashlists
from apps.Flashcards.models import Flashcards, Topics

class TopicsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Topics
        fields = ['name']

class FlashcardsSerializer(serializers.ModelSerializer):
    topic = TopicsSerializer()
    class Meta:
        model = Flashcards
        fields = ['topic', 'question']

class FlashlistsSerializer(serializers.ModelSerializer):
    flashcards = FlashcardsSerializer(many=True)
    class Meta:
        model = Flashlists
        fields = ['name', 'image', 'flashcards']