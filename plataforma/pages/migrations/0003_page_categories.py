# Generated by Django 2.0.7 on 2018-08-31 17:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pages', '0002_auto_20180831_1226'),
    ]

    operations = [
        migrations.AddField(
            model_name='page',
            name='categories',
            field=models.ManyToManyField(related_name='get_posts', to='pages.Category', verbose_name='Categorías'),
        ),
    ]