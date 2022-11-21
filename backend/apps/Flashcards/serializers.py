from rest_framework import serializers
from .models import *

class AnswersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answers
        fields = ['id', 'content', 'correct']

class FlashcardsSerializer(serializers.ModelSerializer):
    answers = AnswersSerializer(many=True, read_only=True)
    class Meta:
        model = Flashcards
        fields = ['question', 'answers', 'type']

class CategoriesListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categories
        fields = ['name', 'image']


#Create Flashcard
class AnswersCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answers
        fields = ['content', 'correct']

class FlashcardCreateSerializer(serializers.ModelSerializer):
    answers = AnswersCreateSerializer(many=True)
    category = serializers.CharField()
    id = serializers.IntegerField()
    class Meta:
        model = Flashcards
        fields = ['id', 'category', 'type', 'question', 'answers']
    
    def create(self, validated_data):
        answers_data = validated_data.pop('answers')
        user = validated_data.pop('id')
        category_name = validated_data.pop('category')

        flashcard = Flashcards.objects.create(category=Categories.objects.get(name=category_name), user=User.objects.get(id=user), **validated_data)
        for answer in answers_data:
            Answers.objects.create(flashcard=flashcard, **answer)

        return flashcard



        
