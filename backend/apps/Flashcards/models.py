from django.db import models
from apps.Auth.models import User

class Categories(models.Model):
    name = models.CharField(max_length=255)
    image = models.ImageField(upload_to='categories')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = 'Categories'

    def __str__(self):
        return '{} - {}'.format(
            self.pk,
            self.name,
        )

class Topics(models.Model):
    category = models.ForeignKey(
        Categories, on_delete=models.CASCADE)
    name = models.CharField(max_length=255, db_collation='und-x-icu')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = 'Topics'

    def __str__(self):
        return '{} - {}'.format(
            self.pk,
            self.name,
        )

INPUT = 'input'
RADIO = 'radio'
TYPES = [
    (INPUT, 'input'),
    (RADIO, 'radio'),
]

class Flashcards(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE)
    topic = models.ForeignKey(
        Topics, on_delete=models.CASCADE)
    type = models.CharField(max_length=255, choices=TYPES)
    question = models.CharField(max_length=255)
    is_verified = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = 'Flashcards'

    def __str__(self):
        return '{} - {} - {} - {} - {}'.format(
            self.pk,
            self.user,
            self.topic,
            self.type,
            self.question,
        )

class Answers(models.Model):
    flashcard = models.ForeignKey(
        Flashcards, on_delete=models.CASCADE, related_name='answers')
    content = models.CharField(max_length=255)
    correct = models.BooleanField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = 'Answers'

    def __str__(self):
        return '{} - {}'.format(
            self.pk,
            self.flashcard,
        )


