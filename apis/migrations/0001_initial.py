# Generated by Django 3.2.4 on 2021-06-17 18:02

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Videos',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=200)),
                ('uploadedby', models.CharField(max_length=60)),
                ('url', models.TextField(max_length=400)),
            ],
        ),
    ]