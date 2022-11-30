from rest_framework import serializers

from .models import Flashlists, FlashlistsElements
from apps.Flashcards.models import Flashcards, Answers

class FlashcardsElementsSerializer(serializers.ModelSerializer):
    question = serializers.CharField(source='flashcard.question')
    topic = serializers.CharField(source='flashcard.topic.name')
    added_at = serializers.CharField(source='created_at')
    class Meta:
        model = FlashlistsElements
        fields = ['id', 'question', 'topic', 'added_at']

class FlashlistsSerializer(serializers.ModelSerializer):
    flashcards = FlashcardsElementsSerializer(many=True)
    class Meta:
        model = Flashlists
        fields = ['id', 'name', 'flashcards']

class FlashlistCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Flashlists
        fields = ['user', 'name']

class AddFlashcardToFlashlistSerializer(serializers.ModelSerializer):
    class Meta:
        model = FlashlistsElements
        fields = '__all__'

class AnswersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answers
        fields = ['id', 'content', 'correct']

class FlashcardsSerializer(serializers.ModelSerializer):
    answers = AnswersSerializer(many=True, read_only=True)
    class Meta:
        model = Flashcards
        fields = ['question', 'answers', 'type']

class FlashlistUpdateNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Flashlists
        fields = ['name']


