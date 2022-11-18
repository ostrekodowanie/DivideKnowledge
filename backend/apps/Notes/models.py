from django.db import models
from apps.Auth.models import User

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
    category = models.CharField(max_length=255, choices=CATEGORIES)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = 'Notes'

    def __str__(self):
<<<<<<< HEAD
        return '{}'.format(
            self.pk,
=======
        return '{} - {}'.format(
            self.pk,
            self.title,
>>>>>>> d169fc24b86a22d81980091a83440a448135d396
        )