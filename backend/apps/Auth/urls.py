from django.urls import path
from . import views
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path('api/signup', views.SignUpView.as_view()),
    path('api/login', views.MyTokenObtainPairView.as_view()),
    path('api/token/refresh', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/verify', views.VerifyView.as_view()),
    path('api/user/<pk>', views.UserView.as_view()),
]