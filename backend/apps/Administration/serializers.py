from rest_framework import serializers

from apps.Flashcards.models import Flashcards, Answers

class AnswersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answers
        fields = ['id', 'content', 'correct']

class FlashcardsVerifySerializer(serializers.ModelSerializer):
    answers = AnswersSerializer(many=True, read_only=True)
    email = serializers.CharField(source='user.email')
    topic = serializers.CharField(source='topic.name')
    class Meta:
        model = Flashcards
        fields = ['id', 'email', 'topic', 'type', 'question','answers', 'created_at']