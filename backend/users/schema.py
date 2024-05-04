import strawberry
from typing import Optional, List
from .models import UserProfile, Review, Book
from .types import UserProfileType, ReviewType
from strawberry.types import Info
from strawberry_django.optimizer import DjangoOptimizerExtension
@strawberry.type
class Query:
    @strawberry.field
    def user_profile(self, info: Info, user_id: int) -> Optional[UserProfileType]:
        return UserProfile.objects.get(id=user_id)

    @strawberry.field
    def users(self) -> List[UserProfileType]:
        return UserProfile.objects.all()
    
    @strawberry.field
    def reviews_by_user_id(self, user_id: int) -> List[ReviewType]:
        return Review.objects.filter(user_id=user_id)

    @strawberry.field
    def reviews(self) -> List[ReviewType]:
        return Review.objects.all()
    @strawberry.field
    def review_by_id(self, review_id: int) -> Optional[ReviewType]:
        return Review.objects.get(id=review_id)

@strawberry.type
class Mutation:
    @strawberry.mutation
    def add_book_to_wishlist(self, user_id: int, book_id: int) -> UserProfileType:
        user_profile = UserProfile.objects.get(id=user_id)
        book = Book.objects.get(id=book_id)
        user_profile.wishlist.add(book)
        return user_profile

    @strawberry.mutation
    def remove_book_from_wishlist(self, user_id: int, book_id: int) -> UserProfileType:
        user_profile = UserProfile.objects.get(id=user_id)
        book = Book.objects.get(id=book_id)
        user_profile.wishlist.remove(book)
        return user_profile

    @strawberry.mutation
    def create_review(self, user_id: int, book_id: int, rating: int, comment: Optional[str]) -> ReviewType:
        user = UserProfile.objects.get(id=user_id)
        book = Book.objects.get(id=book_id)
        review = Review(user=user, book=book, rating=rating, comment=comment)
        review.save()
        return review

    @strawberry.mutation
    def update_review(self, review_id: int, rating: Optional[int] = None, comment: Optional[str] = None) -> ReviewType:
        review = Review.objects.get(id=review_id)
        if rating is not None:
            review.rating = rating
        if comment is not None:
            review.comment = comment
        review.save()
        return review

    @strawberry.mutation
    def delete_review(self, review_id: int) -> Optional[ReviewType]:
        review = Review.objects.get(id=review_id)
        review.delete()
        return None

# Define the schema
schema = strawberry.Schema(query=Query, mutation=Mutation,extensions=[
    DjangoOptimizerExtension
])
