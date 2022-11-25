from rest_framework import serializers
from .models import *

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id']

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Categories
        fields = ['name']

class NotesSerializer(serializers.ModelSerializer):
    user = serializers.IntegerField()
    category = serializers.CharField()
    class Meta:
        model = Notes
        fields = ['user', 'title', 'desc', 'image', 'category']


    def create(self, validated_data):
        user = validated_data.pop('user')
        category = validated_data.pop('category')
        note = Notes.objects.create(user=User.objects.get(id=user), category=Categories.objects.get(name=category), **validated_data)

        return note
        


