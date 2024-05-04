import strawberry
from strawberry import auto
from typing import List
from .models import UserProfile, Review
from books.types import BookType  # assuming you have a BookType in the books app

@strawberry.django.type(UserProfile)
class UserProfileType:
    id: auto
    username: auto
    email: auto
    wishlist: List[BookType]

@strawberry.django.type(Review)
class ReviewType:
    id: auto
    book: BookType
    user: UserProfileType
    rating: auto
    comment: auto
