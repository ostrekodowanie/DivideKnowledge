# Generated by Django 4.1.3 on 2022-11-30 01:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Flashcards', '0002_topics_category'),
        ('Flashlists', '0002_remove_flashlists_image_alter_flashlists_flashcards'),
    ]

    operations = [
        migrations.AlterField(
            model_name='flashlists',
            name='flashcards',
            field=models.ManyToManyField(to='Flashcards.flashcards'),
        ),
    ]
