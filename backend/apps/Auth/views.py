from datetime import datetime, timezone
from .serializers import *
from .utils import Util

from django.utils.translation import gettext_lazy as _

from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken

import random

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    default_error_messages = {
        'no_active_account': _('Incorrect email or password')
    }
    def get_token(cls, user):
        token = super(MyTokenObtainPairSerializer, cls).get_token(user)
        
        token['username'] = user.username
        token['email'] = user.email
        token['plan'] = user.plan
        token['is_staff'] = user.is_staff

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
        
        fixed_digits = 6 
        code = random.randrange(111111, 999999, fixed_digits)
        email_body = 'Hi ' + user.username + '\nVerification code: ' + str(code)
        data = {'email_body': email_body, 'to_email': user.email, 'email_subject': 'Activate your account'}
        Util.send_email(data)

        Verification.objects.create(user=user, code=code)

        return Response(status=status.HTTP_201_CREATED)

class VerifyView(APIView):
    def post(self, request):
        email = request.data['email']
        code = request.data['code']

        user = User.objects.get(email=email)
        verification = Verification.objects.get(user=user)
        if not user.is_verified:
            if not verification.code == code:
                return Response({'Invalid code'}, status=status.HTTP_400_BAD_REQUEST)
            if (datetime.now(timezone.utc) - verification.created_at).seconds > 300:
                verification.delete()
                fixed_digits = 6 
                vcode = random.randrange(111111, 999999, fixed_digits)
                email_body = 'Hi ' + user.username + '\nVerification code: ' + str(vcode)
                data = {'email_body': email_body, 'to_email': user.email, 'email_subject': 'Activate your account'}
                Util.send_email(data)
                return Response({'Code expired. Send again'}, status=status.HTTP_200_OK)
            user.is_verified = True
            user.save()
            verification.delete()
            return Response({'Successfully activated'}, status=status.HTTP_200_OK)
        return Response({'Already verified'}, status=status.HTTP_400_BAD_REQUEST)

class LogoutView(APIView):
    def post(self, request):
        try:
            refresh_token = request.data
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_200_OK)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)

class UserView(generics.RetrieveUpdateDestroyAPIView):
    queryset = User
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]