import strawberry
from typing import List, Optional
from .models import Book, Genre
from .types import BookType, GenreType
from strawberry_django.optimizer import DjangoOptimizerExtension

@strawberry.type
class Query:
    @strawberry.field
    def books(self) -> List[BookType]:
        return Book.objects.all()

    @strawberry.field
    def book_by_id(self, id: int) -> Optional[BookType]:
        return Book.objects.filter(pk=id).first()

    @strawberry.field
    def genres(self) -> List[GenreType]:
        return Genre.objects.all()

    @strawberry.field
    def genre_by_id(self, genre_id: int) -> Optional[GenreType]:
        return Genre.objects.filter(id=genre_id).first()

@strawberry.type
class Mutation:
    @strawberry.mutation
    def create_genre(self, name: str) -> GenreType:
        genre = Genre(name=name)
        genre.save()
        return genre

    @strawberry.mutation
    def update_genre(self, genre_id: int, name: str) -> Optional[GenreType]:
        genre = Genre.objects.get(id=genre_id)
        genre.name = name
        genre.save()
        return genre

    @strawberry.mutation
    def delete_genre(self, genre_id: int) -> Optional[GenreType]:
        genre = Genre.objects.get(id=genre_id)
        genre.delete()
        return None

    # Add mutations for Book similarly as shown for Genre

schema = strawberry.Schema(query=Query, mutation=Mutation,extensions=[
    DjangoOptimizerExtension
])
