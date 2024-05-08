from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.authentication import JWTAuthentication
from api.models import Review
from api.serializers import ReviewSerializer
from api.permissions import IsOwnerOrReadOnly, permissions

@api_view(['GET'])
@authentication_classes([JWTAuthentication])
@permission_classes([permissions.AllowAny])
def review_list(request):
    book_id = request.query_params.get('book_id')
    user_id = request.query_params.get('user_id')
    
    reviews = Review.objects.all()
    
    if book_id:
        reviews = reviews.filter(book_id=book_id)
    if user_id:
        reviews = reviews.filter(user_id=user_id)
        
    serializer = ReviewSerializer(reviews, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@authentication_classes([JWTAuthentication])
@permission_classes([permissions.IsAuthenticated])
def review_create(request):
    serializer = ReviewSerializer(data=request.data, context={'request': request})
    if serializer.is_valid():
        serializer.save(user=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@authentication_classes([JWTAuthentication])
@permission_classes([permissions.AllowAny])
def review_retrieve(request, pk):
    try:
        review = Review.objects.get(pk=pk)
        serializer = ReviewSerializer(review)
        return Response(serializer.data)
    except Review.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    

@api_view(['PUT'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsOwnerOrReadOnly])
def review_update(request, pk):
    try:
        review = Review.objects.get(pk=pk)
    except Review.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = ReviewSerializer(review, data=request.data, context={'request': request})
    if serializer.is_valid():
        if review.user != request.user:
            return Response(status=status.HTTP_403_FORBIDDEN)
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsOwnerOrReadOnly])
def review_delete(request, pk):
    try:
        review = Review.objects.get(pk=pk)
    except Review.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if review.user != request.user:
        return Response(status=status.HTTP_403_FORBIDDEN)
    review.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)
