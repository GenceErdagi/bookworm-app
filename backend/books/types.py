import strawberry
from typing import List
from .models import Book, Genre
from strawberry import auto

@strawberry.django.type(Genre)
class GenreType:
    id: auto
    name: auto

@strawberry.django.type(Book)
class BookType:
    id: auto
    title: auto
    author: auto
    publication_date: auto
    isbn: auto
    genres: List[GenreType]
    description: auto
