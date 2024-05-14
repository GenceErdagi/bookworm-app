from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.decorators import  permission_classes, authentication_classes
from api.serializers import CustomTokenObtainPairSerializer


@authentication_classes([])
@permission_classes([])
class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer