from django.db import models
from apps.Flashcards.models import Flashcards
from apps.Auth.models import User

class Flashlists(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = 'Flashlists'

    def __str__(self):
        return '{} - {}'.format(
            self.pk,
            self.name,
        )

class FlashlistsElements(models.Model):
    flashlist = models.ForeignKey(
        Flashlists, on_delete=models.CASCADE, related_name='flashcards')
    flashcard = models.ForeignKey(
        Flashcards, on_delete=models.CASCADE, related_name='flashlists')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = 'Elements'
        unique_together = [['flashlist', 'flashcard']]

    def __str__(self):
        return '{}'.format(
            self.pk,
        )

    
