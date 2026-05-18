import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = [
        ("product", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="Sale",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                ("details", models.TextField(blank=True)),
                ("customer", models.CharField(max_length=255)),
                ("total_price", models.FloatField(default=0)),
                ("discount", models.FloatField(default=0)),
                ("paid_amount", models.FloatField(default=0)),
                ("due_amount", models.FloatField(default=0)),
                ("purchase_cost", models.FloatField(default=0)),
                ("profit", models.FloatField(default=0)),
            ],
        ),
        migrations.CreateModel(
            name="SoldProduct",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                ("quantity", models.IntegerField(default=1)),
                ("price", models.FloatField(default=0)),
                ("purchase_price", models.FloatField(default=0)),
                ("total_price", models.FloatField(default=0)),
                ("product", models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to="product.product")),
                ("sale", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name="items", to="sale.sale")),
            ],
        ),
    ]
