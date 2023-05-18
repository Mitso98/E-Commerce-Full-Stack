# Generated by Django 4.2 on 2023-05-18 17:35

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('Product', '0001_initial'),
        ('Cart', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='cartitem',
            name='Product',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Product.product'),
        ),
        migrations.AddField(
            model_name='cart',
            name='products',
            field=models.ManyToManyField(through='Cart.CartItem', to='Product.product'),
        ),
    ]
