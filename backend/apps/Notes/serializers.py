from rest_framework import serializers
from .models import Notes, Categories, User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id']

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Categories
        fields = ['name']

class NotesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notes
        fields = ['user', 'title', 'desc', 'image', 'category']

class NotesCategoriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categories
        fields = ['id', 'name', 'image']
        
class NoteLikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notes
        fields = ['user', 'note']


