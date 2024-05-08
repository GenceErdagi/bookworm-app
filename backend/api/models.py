from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import MaxValueValidator, MinValueValidator
class Genre(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name

class Book(models.Model):
    title = models.CharField(max_length=255)
    author = models.CharField(max_length=255)
    publication_date = models.DateField()
    isbn = models.CharField(max_length=20, unique=True)
    genres = models.ManyToManyField(Genre)
    description = models.TextField()
    cover_image = models.ImageField(upload_to='book_covers/', blank=True, null=True)
    
    def __str__(self):
        return self.title

class UserProfile(AbstractUser):
    email = models.EmailField(blank=False,verbose_name="email", max_length=255, unique=True)
    USERNAME_FIELD = "username"
    EMAIL_FIELD = "email"
    wishlist = models.ManyToManyField(Book, related_name='wished_by', blank=True)
    
    def __str__(self):
        return self.username

class Review(models.Model):
    book = models.ForeignKey(Book, on_delete=models.CASCADE, related_name='reviews')
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name='reviews')
    rating = models.PositiveIntegerField(validators=[
            MaxValueValidator(5),
            MinValueValidator(1)
        ])
    comment = models.TextField(blank=True)

    def __str__(self):
        return f'{self.rating} - {self.user} - {self.book.title}'
