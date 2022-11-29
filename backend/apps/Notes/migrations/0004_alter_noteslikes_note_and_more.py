# Generated by Django 4.1.3 on 2022-11-29 00:52

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('Notes', '0003_notes_is_verified_noteslikes'),
    ]

    operations = [
        migrations.AlterField(
            model_name='noteslikes',
            name='note',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='noteslikes', to='Notes.notes'),
        ),
        migrations.AlterUniqueTogether(
            name='noteslikes',
            unique_together={('user', 'note')},
        ),
    ]