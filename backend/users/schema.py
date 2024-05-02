import graphene
from graphene_django import DjangoObjectType
from django.contrib.auth.models import User
from .models import UserProfile
from books.models import Book

class UserType(DjangoObjectType):
    class Meta:
        model = User
        fields = ("id", "username", "email")

class UserProfileType(DjangoObjectType):
    class Meta:
        model = UserProfile
        fields = ("user", "wishlist")

class AddBookToWishlist(graphene.Mutation):
    class Arguments:
        user_id = graphene.Int(required=True)
        book_id = graphene.Int(required=True)

    user_profile = graphene.Field(UserProfileType)

    @staticmethod
    def mutate(root, info, user_id, book_id):
        user_profile = UserProfile.objects.get(user__id=user_id)
        book = Book.objects.get(id=book_id)
        user_profile.wishlist.add(book)
        return AddBookToWishlist(user_profile=user_profile)

class RemoveBookFromWishlist(graphene.Mutation):
    class Arguments:
        user_id = graphene.Int(required=True)
        book_id = graphene.Int(required=True)

    user_profile = graphene.Field(UserProfileType)

    @staticmethod
    def mutate(root, info, user_id, book_id):
        user_profile = UserProfile.objects.get(user__id=user_id)
        book = Book.objects.get(id=book_id)
        user_profile.wishlist.remove(book)
        return RemoveBookFromWishlist(user_profile=user_profile)

class Query(graphene.ObjectType):
    user_profile = graphene.Field(UserProfileType, user_id=graphene.Int())

    def resolve_user_profile(self, info, user_id):
        return UserProfile.objects.get(user__id=user_id)

class Mutation(graphene.ObjectType):
    add_book_to_wishlist = AddBookToWishlist.Field()
    remove_book_from_wishlist = RemoveBookFromWishlist.Field()
