from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)

from api.views.books import book_create, book_delete, book_list, book_retrieve, book_update
from api.views.genres import  genre_create, genre_delete, genre_list, genre_retrieve, genre_update
from api.views.reviews import review_create, review_delete, review_list, review_retrieve, review_update
from api.views.userProfiles import user_profile_delete, user_profile_list, user_profile_retrieve, user_profile_update
from api.views.customTokenObtainPair import CustomTokenObtainPairView




urlpatterns = [
    path('token', CustomTokenObtainPairView.as_view() , name='token_obtain_pair'),
    path('token/refresh', TokenRefreshView.as_view(), name='token_refresh'),
    path('token/verify', TokenVerifyView.as_view(), name='token_verify'),
    path('books/', book_list, name='book-list'),
    path('books/create/', book_create, name='book-create'),
    path('books/<int:pk>/', book_retrieve, name='book-retrieve'),
    path('books/<int:pk>/update/', book_update, name='book-update'),
    path('books/<int:pk>/delete/', book_delete, name='book-delete'),
    path('genres/', genre_list, name='genre-list'),
    path('genres/create/', genre_create, name='genre-create'),
    path('genres/<int:pk>/', genre_retrieve, name='genre-retrieve'),
    path('genres/<int:pk>/update/', genre_update, name='genre-update'),
    path('genres/<int:pk>/delete/', genre_delete, name='genre-delete'),
    path('reviews/', review_list, name='review-list'),
    path('reviews/create/', review_create, name='review-create'),
    path('reviews/<int:pk>/', review_retrieve, name='review-retrieve'),
    path('reviews/<int:pk>/update/', review_update, name='review-update'),
    path('reviews/<int:pk>/delete/', review_delete, name='review-delete'),
    path('userprofiles/', user_profile_list, name='user-profile-list'),
    path('userprofiles/<int:pk>/', user_profile_retrieve, name='user-profile-retrieve'),
    path('userprofiles/<int:pk>/update/', user_profile_update, name='user-profile-update'),
    path('userprofiles/<int:pk>/delete/', user_profile_delete, name='user-profile-delete'),
]
