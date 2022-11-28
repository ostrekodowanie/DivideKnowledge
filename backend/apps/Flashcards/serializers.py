from rest_framework import serializers
from .models import Flashcards, Answers, Categories, Topics, User

class AnswersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answers
        fields = ['id', 'content', 'correct']

class FlashcardsSerializer(serializers.ModelSerializer):
    answers = AnswersSerializer(many=True, read_only=True)
    class Meta:
        model = Flashcards
        fields = ['question', 'answers', 'type']

class FlashcardsCategoriesListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categories
        fields = ['id', 'name', 'image']

class TopicsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Topics
        fields = ['name']

#Create Flashcard
class AnswersCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answers
        fields = ['content', 'correct']

class FlashcardCreateSerializer(serializers.ModelSerializer):
    answers = AnswersCreateSerializer(many=True)
    category = serializers.CharField()
    id = serializers.IntegerField()
    topic = serializers.CharField()
    class Meta:
        model = Flashcards
        fields = ['id', 'category', 'type', 'question', 'answers', 'topic']
    
    def create(self, validated_data):
        answers_data = validated_data.pop('answers')
        user = validated_data.pop('id')
        category_name = validated_data.pop('category')
        topic_name = validated_data.pop('topic')

        topic_obj, _ = Topics.objects.get_or_create(category=Categories.objects.get(name=category_name), name=topic_name)
        flashcard = Flashcards.objects.create(topic=topic_obj, user=User.objects.get(id=user), **validated_data)
        for answer in answers_data:
            Answers.objects.create(flashcard=flashcard, **answer)

        return flashcard
