# Generated by Django 3.1.3 on 2020-11-05 18:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('articles', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Files',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('filename', models.CharField(max_length=120)),
                ('file', models.FileField(upload_to='')),
            ],
        ),
    ]
