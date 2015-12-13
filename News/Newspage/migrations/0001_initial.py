# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
import tinymce.models


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='posts',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('author', models.CharField(max_length=40)),
                ('title', models.CharField(max_length=200)),
                ('bodytext', tinymce.models.HTMLField()),
                ('timestamp', models.DateTimeField()),
            ],
        ),
    ]
