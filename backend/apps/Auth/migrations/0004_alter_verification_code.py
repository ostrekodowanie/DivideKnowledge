# Generated by Django 4.1.3 on 2022-11-02 20:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Auth', '0003_verification'),
    ]

    operations = [
        migrations.AlterField(
            model_name='verification',
            name='code',
            field=models.DecimalField(decimal_places=0, max_digits=6),
        ),
    ]
