from rest_framework import viewsets, permissions
from rest_framework_simplejwt.authentication import JWTAuthentication

from .models import Book, Genre, Review, UserProfile
from .serializers import BookSerializer, GenreSerializer, ReviewSerializer, UserProfileSerializer
from .permissions import IsAdminOrReadOnly, IsOwnerOrReadOnly, IsSelfOrReadOnly

class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAdminOrReadOnly]

class GenreViewSet(viewsets.ModelViewSet):
    queryset = Genre.objects.all()
    serializer_class = GenreSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAdminOrReadOnly]

class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    authentication_classes = [JWTAuthentication]

    def get_permissions(self):
        """
        Instantiates and returns the list of permissions that this view requires.
        """
        if self.action in ['list', 'retrieve']:
            permission_classes = [permissions.AllowAny]
        else:
            permission_classes = [IsOwnerOrReadOnly, permissions.IsAuthenticated]
        return [permission() for permission in permission_classes]

class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsSelfOrReadOnly]
