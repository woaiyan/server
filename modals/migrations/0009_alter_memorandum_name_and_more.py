# Generated by Django 4.0.4 on 2022-06-25 17:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('modals', '0008_memorandumcategory_memorandum'),
    ]

    operations = [
        migrations.AlterField(
            model_name='memorandum',
            name='name',
            field=models.CharField(max_length=100),
        ),
        migrations.AlterUniqueTogether(
            name='memorandum',
            unique_together={('category', 'name')},
        ),
        migrations.AlterIndexTogether(
            name='memorandum',
            index_together={('category', 'name')},
        ),
    ]
