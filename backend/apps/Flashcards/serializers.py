from rest_framework import serializers
from .models import *

class AnswersSerializer(serializers.ModelSerializer):
    #question = serializers.CharField(source='flashcards.question')
    class Meta:
        model = Answers
        fields = ['id', 'content', 'correct']

class FlashcardsSerializer(serializers.ModelSerializer):
    answers = AnswersSerializer(many=True, read_only=True)
    class Meta:
        model = Flashcards
        fields = ['question', 'answers']