# Generated by Django 4.2.1 on 2023-05-26 13:45

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('Orders', '0005_order_full_filled'),
    ]

    operations = [
        migrations.CreateModel(
            name='Payment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('is_paid', models.BooleanField(default=False)),
                ('order', models.OneToOneField(on_delete=django.db.models.deletion.PROTECT, to='Orders.order')),
            ],
        ),
    ]
