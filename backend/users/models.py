from django.contrib.auth.models import AbstractUser
from django.db import models
from books.models import Book

# Create your models here.

class UserProfile(AbstractUser):
    email = models.EmailField(blank=False,verbose_name="email", max_length=255, unique=True)
    USERNAME_FIELD = "username"
    EMAIL_FIELD = "email"
    wishlist = models.ManyToManyField(Book, related_name='wished_by', blank=True)
    
    def __str__(self):
        return self.username

# Path: backend/users/schema.py
class Review(models.Model):
    book = models.ForeignKey(Book, on_delete=models.CASCADE, related_name='reviews')
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name='reviews')
    rating = models.PositiveIntegerField()
    comment = models.TextField(blank=True)

    def __str__(self):
        return f'{self.rating} - {self.user} - {self.book.title}'
