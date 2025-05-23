from django.urls import path

from veredict.api.v1.core.views import TokenObtainPairView

urlpatterns = [
    path("token/", TokenObtainPairView.as_view(), name="jwt-auth"),
]
