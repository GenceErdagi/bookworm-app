import graphene
from graphene_django import DjangoObjectType
from .models import Book, Genre, Review
from django.contrib.auth.models import User

class GenreType(DjangoObjectType):
    class Meta:
        model = Genre
        fields = "__all__"

class BookType(DjangoObjectType):
    class Meta:
        model = Book
        fields = "__all__"

class ReviewType(DjangoObjectType):
    class Meta:
        model = Review
        fields = "__all__"

class CreateGenre(graphene.Mutation):
    class Arguments:
        name = graphene.String(required=True)

    genre = graphene.Field(GenreType)

    @staticmethod
    def mutate(root, info, name):
        genre = Genre(name=name)
        genre.save()
        return CreateGenre(genre=genre)

class UpdateGenre(graphene.Mutation):
    class Arguments:
        genre_id = graphene.Int(required=True)
        name = graphene.String()

    genre = graphene.Field(GenreType)

    @staticmethod
    def mutate(root, info, genre_id, name=None):
        genre = Genre.objects.get(id=genre_id)
        if name:
            genre.name = name
        genre.save()
        return UpdateGenre(genre=genre)

class DeleteGenre(graphene.Mutation):
    class Arguments:
        genre_id = graphene.Int(required=True)

    genre = graphene.Field(GenreType)

    @staticmethod
    def mutate(root, info, genre_id):
        genre = Genre.objects.get(id=genre_id)
        genre.delete()
        return DeleteGenre(genre=None)

class CreateBook(graphene.Mutation):
    class Arguments:
        title = graphene.String(required=True)
        author = graphene.String(required=True)
        publication_date = graphene.String(required=True)  # Use ISO date format: YYYY-MM-DD
        isbn = graphene.String(required=True)
        description = graphene.String()
        genre_ids = graphene.List(graphene.Int)

    book = graphene.Field(BookType)

    @staticmethod
    def mutate(root, info, title, author, publication_date, isbn, description, genre_ids):
        book = Book(
            title=title,
            author=author,
            publication_date=publication_date,
            isbn=isbn,
            description=description
        )
        book.save()
        book.genres.set(Genre.objects.filter(id__in=genre_ids))
        book.save()
        return CreateBook(book=book)

class UpdateBook(graphene.Mutation):
    class Arguments:
        book_id = graphene.Int(required=True)
        title = graphene.String()
        author = graphene.String()
        publication_date = graphene.String()  # Use ISO date format: YYYY-MM-DD
        isbn = graphene.String()
        description = graphene.String()
        genre_ids = graphene.List(graphene.Int)

    book = graphene.Field(BookType)

    @staticmethod
    def mutate(root, info, book_id, title=None, author=None, publication_date=None, isbn=None, description=None, genre_ids=None):
        book = Book.objects.get(id=book_id)
        if title:
            book.title = title
        if author:
            book.author = author
        if publication_date:
            book.publication_date = publication_date
        if isbn:
            book.isbn = isbn
        if description:
            book.description = description
        if genre_ids is not None:
            book.genres.set(Genre.objects.filter(id__in=genre_ids))
        book.save()
        return UpdateBook(book=book)

class DeleteBook(graphene.Mutation):
    class Arguments:
        book_id = graphene.Int(required=True)

    book = graphene.Field(BookType)

    @staticmethod
    def mutate(root, info, book_id):
        book = Book.objects.get(id=book_id)
        book.delete()
        return DeleteBook(book=None)

class CreateReview(graphene.Mutation):
    class Arguments:
        user_id = graphene.Int(required=True)
        book_id = graphene.Int(required=True)
        rating = graphene.Int(required=True)
        comment = graphene.String()

    review = graphene.Field(ReviewType)

    @staticmethod
    def mutate(root, info, user_id, book_id, rating, comment):
        user = User.objects.get(id=user_id)
        book = Book.objects.get(id=book_id)
        review = Review(user=user, book=book, rating=rating, comment=comment)
        review.save()
        return CreateReview(review=review)

class UpdateReview(graphene.Mutation):
    class Arguments:
        review_id = graphene.Int(required=True)
        rating = graphene.Int()
        comment = graphene.String()

    review = graphene.Field(ReviewType)

    @staticmethod
    def mutate(root, info, review_id, rating=None, comment=None):
        review = Review.objects.get(id=review_id)
        if rating is not None:
            review.rating = rating
        if comment is not None:
            review.comment = comment
        review.save()
        return UpdateReview(review=review)

class DeleteReview(graphene.Mutation):
    class Arguments:
        review_id = graphene.Int(required=True)

    review = graphene.Field(ReviewType)

    @staticmethod
    def mutate(root, info, review_id):
        review = Review.objects.get(id=review_id)
        review.delete()
        return DeleteReview(review=None)

class Query(graphene.ObjectType):
    books = graphene.List(BookType)
    book_by_id = graphene.Field(BookType, id=graphene.Int())
    genres = graphene.List(GenreType)
    genre_by_id = graphene.Field(GenreType, genre_id=graphene.Int(required=True))

    reviews = graphene.List(ReviewType)
    review_by_id = graphene.Field(ReviewType, review_id=graphene.Int(required=True))
    def resolve_books(self, info, **kwargs):
        return Book.objects.all()

    def resolve_book_by_id(self, info, id):
        return Book.objects.get(pk=id)
    
    def resolve_genres(root, info):
        return Genre.objects.all()

    def resolve_genre_by_id(root, info, genre_id):
        return Genre.objects.get(id=genre_id)
    
    def resolve_reviews(root, info):
        return Review.objects.all()

    def resolve_review_by_id(root, info, genre_id):
        return Review.objects.get(id=genre_id)
    
class Mutation(graphene.ObjectType):
    create_genre = CreateGenre.Field()
    update_genre = UpdateGenre.Field()
    delete_genre = DeleteGenre.Field()
    create_book = CreateBook.Field()
    update_book = UpdateBook.Field()
    delete_book = DeleteBook.Field()
    create_review = CreateReview.Field()
    update_review = UpdateReview.Field()
    delete_review = DeleteReview.Field()
