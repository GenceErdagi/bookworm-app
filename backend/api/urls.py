from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)

from api.views.books import book_detail, book_list_create
from api.views.genres import genre_detail, genre_list_create
from api.views.reviews import review_detail, review_list_create
from api.views.userProfiles import user_profile_detail



urlpatterns = [
    path('books/', book_list_create, name='book-list'),
    path('books/<int:pk>/', book_detail, name='book-detail'),
    path('genres/', genre_list_create, name='genre-list'),
    path('genres/<int:pk>/', genre_detail, name='genre-detail'),
    path('reviews/', review_list_create, name='review-list'),
    path('reviews/<int:pk>/', review_detail, name='review-detail'),
    path('userprofiles/<str:username>/', user_profile_detail, name='userprofile-detail'),
    path('token', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh', TokenRefreshView.as_view(), name='token_refresh'),
    path('token/verify', TokenVerifyView.as_view(), name='token_verify'),
]
