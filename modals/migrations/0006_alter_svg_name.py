# Generated by Django 4.0.4 on 2022-06-03 18:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('modals', '0005_alter_svg_name'),
    ]

    operations = [
        migrations.AlterField(
            model_name='svg',
            name='name',
            field=models.CharField(max_length=100, unique=True),
        ),
    ]