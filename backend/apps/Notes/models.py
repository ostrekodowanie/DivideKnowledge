from django.db import models
from apps.Auth.models import User
from apps.Flashcards.models import Categories

MATEMATYKA = 'Matematyka'
BIOLOGIA = 'Biologia'
CHEMIA = 'Chemia'
FIZYKA = 'Fizyka'
HISTORIA = 'Historia'
GEOGRAFIA = 'Geografia'
INFORMATYKA = 'Informatyka'
J_POLSKI = 'Język Polski'
J_ANGIELSKI = 'Język Angielski'
CATEGORIES = [
    (MATEMATYKA, 'Matematyka'),
    (BIOLOGIA, 'Biologia'),
    (CHEMIA, 'Chemia'),
    (FIZYKA, 'Fizyka'),
    (HISTORIA, 'Historia'),
    (GEOGRAFIA, 'Geografia'),
    (INFORMATYKA, 'Informatyka'),
    (J_POLSKI, 'Język Polski'),
    (J_ANGIELSKI, 'Język Angielski'),
]

class Notes(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    desc = models.CharField(max_length=255)
    image = models.ImageField(upload_to='notes')
    category = models.ForeignKey(
        Categories, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = 'Notes'

    def __str__(self):
        return '{} - {}'.format(
            self.pk,
            self.title,
        )