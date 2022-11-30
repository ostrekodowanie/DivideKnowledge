from django.db import models
from apps.Auth.models import User
from apps.Flashcards.models import Categories

class Notes(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE)
    category = models.ForeignKey(
        Categories, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    desc = models.CharField(max_length=255, null=True, blank=True)
    image = models.ImageField(upload_to='notes')
    is_verified = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = 'Notes'

    def __str__(self):
        return '{} | {}'.format(
            self.pk,
            self.title,
        )

class NotesLikes(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE)
    note = models.ForeignKey(
        Notes, on_delete=models.CASCADE, related_name='noteslikes')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = 'Notes Likes'
        unique_together = [['user', 'note']]

    def __str__(self):
        return '{} | {} | {}'.format(
            self.pk,
            self.user,
            self.note,
        )
    