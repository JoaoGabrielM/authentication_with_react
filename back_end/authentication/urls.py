from django.urls import path
from django.conf.urls import include

urlpatterns = [
    path('auth/', include('rest_framework.urls')),
]
