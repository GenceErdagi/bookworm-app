# Path: backend/api/serializers.py

from rest_framework import serializers
from .models import UserProfile, Book, Genre, Review
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers


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



class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        
        # Add custom data from your user model here
        user = self.user
        data['user_id'] = user.id
        
        return data
