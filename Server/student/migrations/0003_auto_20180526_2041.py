# Generated by Django 2.0.5 on 2018-05-26 12:41

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('student', '0002_auto_20180509_1137'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='student',
            name='last_disconnect',
        ),
        migrations.RemoveField(
            model_name='student',
            name='rand_str',
        ),
    ]
