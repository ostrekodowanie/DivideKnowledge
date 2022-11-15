from django.db import models
from django.contrib.auth.models import AbstractUser

FREE = 'Free'
PREMIUM = 'Premium'
PLANS = [
    (FREE, 'Free'),
    (PREMIUM, 'Premium'),
]

class User(AbstractUser):
    email = models.EmailField(max_length=255, unique=True)
    username = models.CharField(max_length=255, unique=True)
    password = models.CharField(max_length=255)
    plan = models.CharField(max_length=255, choices=PLANS, default='Free')
    is_verified = models.BooleanField(default=False)


    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def __str__(self):
        return '{} - {}'.format(
            self.pk,
            self.email,
        )

class Verification(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE)
    code = models.DecimalField(max_digits=6, decimal_places=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return '{} - {} - {}'.format(
            self.pk,
            self.user,
            self.code,
        )