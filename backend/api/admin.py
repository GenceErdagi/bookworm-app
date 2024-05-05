from django.contrib import admin

from api.models import Book, Genre, Review, UserProfile

# Register your models here.
admin.site.register(Genre)
admin.site.register(Book)
admin.site.register(UserProfile)
admin.site.register(Review)