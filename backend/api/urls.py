from rest_framework.routers import DefaultRouter
from .views import GenreViewSet, BookViewSet, UserProfileViewSet, ReviewViewSet

router = DefaultRouter()
router.register(r'genres', GenreViewSet)
router.register(r'books', BookViewSet)
router.register(r'users', UserProfileViewSet)
router.register(r'reviews', ReviewViewSet)

urlpatterns = router.urls
