from .serializers import *
from .utils import Util

from django.contrib.sites.shortcuts import get_current_site
from django.urls import reverse
from django.utils.translation import gettext_lazy as _

from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    default_error_messages = {
        'no_active_account': _('Incorrect email or password')
    }
    def get_token(cls, user):
        token = super(MyTokenObtainPairSerializer, cls).get_token(user)
        
        token['username'] = user.username
        token['email'] = user.email

        if user.is_verified == False:
            raise AuthenticationFailed('Activate your account')

        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class SignUpView(generics.GenericAPIView):
    serializer_class = SignUpSerializer
    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        user_data = serializer.data
        user = User.objects.get(email=user_data['email'])

        token = RefreshToken.for_user(user).access_token
        current_site = get_current_site(request).domain
        relativeLink = reverse('activate-account')
        absurl = 'https://' + current_site + relativeLink + '?token=' + str(token)
        email_body = 'Hi ' + user.username + '\nActivate your account: ' + absurl
        data = {'email_body': email_body, 'to_email': user.email, 'email_subject': 'Activate your account'}
        Util.send_email(data)

        return Response(status=status.HTTP_201_CREATED)