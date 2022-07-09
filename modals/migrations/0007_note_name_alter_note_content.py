# Generated by Django 4.0.4 on 2022-06-11 15:40

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('modals', '0006_alter_svg_name'),
    ]

    operations = [
        migrations.AddField(
            model_name='note',
            name='name',
            field=models.CharField(default=django.utils.timezone.now, max_length=100, unique=True),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='note',
            name='content',
            field=models.TextField(blank=True, max_length=100000),
        ),
    ]
