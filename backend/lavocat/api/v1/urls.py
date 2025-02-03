from django.urls import path, include
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework import permissions


app_name = 'api.v1'

schema_view = get_schema_view(
    openapi.Info(
        title="Lavocat API",
        default_version='v1',
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path('', schema_view.with_ui('swagger', cache_timeout=0), name='docs'),
    path('', include('lavocat.api.v1.attendances.urls')),
    path('', include('lavocat.api.v1.core.urls')),
]
