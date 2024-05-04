import strawberry
from books.schema import Query as BookQuery, Mutation as BookMutation
from users.schema import Query as UserQuery, Mutation as UserMutation

@strawberry.type
class Query(BookQuery, UserQuery):
    pass

@strawberry.type
class Mutation(BookMutation, UserMutation):
    pass

schema = strawberry.Schema(query=Query, mutation=Mutation)
