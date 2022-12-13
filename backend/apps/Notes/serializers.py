from rest_framework import serializers
from .models import Notes, Categories, User, NotesLikes

class NoteSerializer(serializers.ModelSerializer):
    is_liked = serializers.BooleanField(read_only=True)
    likes = serializers.SerializerMethodField()

    def get_likes(self, ob):
        return ob.noteslikes.count()
        
    class Meta:
        model = Notes
        fields = ['title', 'image', 'desc', 'likes', 'is_liked']

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id']

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Categories
        fields = ['name']

class NotesSerializer(serializers.ModelSerializer):
    is_liked = serializers.BooleanField(read_only=True)
    likes = serializers.SerializerMethodField()
    category = serializers.CharField(source='category.name')

    def get_likes(self, ob):
        return ob.noteslikes.count()
        
    class Meta:
        model = Notes
        fields = ['id', 'user', 'title', 'desc', 'image', 'category', 'likes', 'is_liked']

class NotesCategoriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categories
        fields = ['id', 'name', 'image']
        
class NoteLikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = NotesLikes
        fields = ['user', 'note']

class RecentNotesSerializer(serializers.ModelSerializer):
    is_liked = serializers.BooleanField(read_only=True)
    class Meta:
        model = Notes
        fields = ['id', 'title', 'image', 'is_liked']



