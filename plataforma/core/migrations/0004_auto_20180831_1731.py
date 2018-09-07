# Generated by Django 2.0.7 on 2018-08-31 22:31

import ckeditor.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0003_auto_20180831_1714'),
    ]

    operations = [
        migrations.AlterField(
            model_name='caso',
            name='descriptFormaCap',
            field=ckeditor.fields.RichTextField(blank=True, null=True, verbose_name='Descripción de la forma de captación'),
        ),
        migrations.AlterField(
            model_name='caso',
            name='finalidadExplotación',
            field=models.CharField(choices=[('ex', 'Explotación de la prostitución ajena u otras formas de Explotación sexual'), ('tr', 'Trabajos o servicios forzosos'), ('me', 'Mendicidad ajena'), ('ma', 'Matrimonio servil'), ('or', 'Extracción de órganos'), ('es', 'Practicas análogas a la esclavitud'), ('se', 'Servidumbre'), ('no', 'No se concretó'), ('ot', 'Otro')], max_length=2, verbose_name='Finalidad de explotación'),
        ),
        migrations.AlterField(
            model_name='caso',
            name='medioContacto',
            field=models.CharField(choices=[('re', 'Redes sociales'), ('cl', 'Clasificados'), ('ra', 'Radio'), ('am', 'Amigo(a)'), ('pr', 'Pareja'), ('ot', 'Otro')], max_length=2, verbose_name='Medio de contacto'),
        ),
    ]