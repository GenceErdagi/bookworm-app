# Path: backend/api/serializers.py

from rest_framework import serializers
from .models import UserProfile, Book, Genre, Review

class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = '__all__'
  
class BookSerializer(serializers.ModelSerializer):
    genres = GenreSerializer(many=True)
    class Meta:
        model = Book
        fields = '__all__'

class UserProfileSerializer(serializers.ModelSerializer):
    wishlist = BookSerializer(many=True)
    class Meta:
        model = UserProfile
        fields = ['id', 'username', 'email', 'wishlist']

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = "__all__"

