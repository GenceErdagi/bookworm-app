from django.contrib.auth.models import User
from django.db import models
from books.models import Book

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    wishlist = models.ManyToManyField(Book, related_name='wished_by', blank=True)

    def __str__(self):
        return self.user.username
