from rest_framework_simplejwt.views import TokenViewBase

from lavocat.api.v1.core.serializers import CustomTokenObtainPairSerializer


class TokenObtainPairView(TokenViewBase):
    """
    Takes a set of user credentials and returns an access and refresh JSON web
    token pair to prove the authentication of those credentials.
    """

    serializer_class = CustomTokenObtainPairSerializer
