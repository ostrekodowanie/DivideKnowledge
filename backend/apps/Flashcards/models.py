from django.db import models
from apps.Auth.models import User

class Flashcards(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE) 
    question = models.CharField(max_length=255)
<<<<<<< HEAD
    correct_answer = models.CharField(max_length=255)
    wrong_answer1 = models.CharField(max_length=255, blank=True, null=True)
    wrong_answer2 = models.CharField(max_length=255, blank=True, null=True)
    wrong_answer3 = models.CharField(max_length=255, blank=True, null=True)
=======
>>>>>>> d169fc24b86a22d81980091a83440a448135d396
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = 'Flashcards'

    def __str__(self):
        return '{} - {} - {}'.format(
            self.pk,
            self.user,
            self.question,
        )

class Answers(models.Model):
<<<<<<< HEAD
    user = models.ForeignKey(
        User, on_delete=models.CASCADE)
    flashcard = models.ForeignKey(
        Flashcards, on_delete=models.CASCADE)
    answer = models.CharField(max_length=255)
=======
    flashcard = models.ForeignKey(
        Flashcards, on_delete=models.CASCADE, related_name='answers')
    content = models.CharField(max_length=255)
>>>>>>> d169fc24b86a22d81980091a83440a448135d396
    correct = models.BooleanField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = 'Answers'

    def __str__(self):
<<<<<<< HEAD
        return '{} - {} - {}'.format(
            self.pk,
            self.user,
=======
        return '{} - {}'.format(
            self.pk,
>>>>>>> d169fc24b86a22d81980091a83440a448135d396
            self.flashcard,
        )


