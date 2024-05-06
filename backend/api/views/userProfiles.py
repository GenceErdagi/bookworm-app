from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.authentication import JWTAuthentication
from api.models import UserProfile
from api.serializers import UserProfileSerializer
from api.permissions import IsSelfOrReadOnly

@api_view(['GET'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsSelfOrReadOnly])
def user_profile_list(request):
    users = UserProfile.objects.all()
    serializer = UserProfileSerializer(users, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsSelfOrReadOnly])
def user_profile_retrieve(request, pk):
    try:
        user = UserProfile.objects.get(pk=pk)
        serializer = UserProfileSerializer(user)
        return Response(serializer.data)
    except UserProfile.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

@api_view(['PUT'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsSelfOrReadOnly])
def user_profile_update(request, pk):
    try:
        user = UserProfile.objects.get(pk=pk)
    except UserProfile.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    # Check if the user is the same as the one making the request
    if user != request.user:
        return Response(status=status.HTTP_403_FORBIDDEN)

    serializer = UserProfileSerializer(user, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsSelfOrReadOnly])
def user_profile_delete(request, pk):
    try:
        user = UserProfile.objects.get(pk=pk)
    except UserProfile.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if user != request.user:
        return Response(status=status.HTTP_403_FORBIDDEN)
    
    user.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)
