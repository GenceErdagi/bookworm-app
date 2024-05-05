from rest_framework import viewsets, permissions
from django.utils.decorators import method_decorator
from asgiref.sync import sync_to_async
from .models import Genre, Book, UserProfile, Review
from .serializers import GenreSerializer, BookSerializer, UserProfileSerializer, ReviewSerializer
from .permissions import IsAdminOrReadOnly, IsOwnerOrReadOnly, IsSelfOrReadOnly

class AsyncViewSetMixin:
    """
    Mixin to convert a viewset to support asynchronous handling.
    """
    @method_decorator(sync_to_async)
    def dispatch(self, *args, **kwargs):
        return super().dispatch(*args, **kwargs)

class GenreViewSet(AsyncViewSetMixin, viewsets.ModelViewSet):
    queryset = Genre.objects.all()
    serializer_class = GenreSerializer
    permission_classes = [IsAdminOrReadOnly]

class BookViewSet(AsyncViewSetMixin, viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    permission_classes = [IsAdminOrReadOnly]

class UserProfileViewSet(AsyncViewSetMixin, viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [IsSelfOrReadOnly]

class ReviewViewSet(AsyncViewSetMixin, viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    def get_permissions(self):
        if self.action == 'list' or self.action == 'retrieve':
            permission_classes = [permissions.AllowAny]
        else:
            permission_classes = [IsOwnerOrReadOnly]
        return [permission() for permission in permission_classes]

