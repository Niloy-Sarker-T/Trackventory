import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = [
        ("product", "0001_initial"),
        ("supplier", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="Purchase",
            fields=[
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                ("bill_no", models.AutoField(primary_key=True, serialize=False)),
                ("note", models.TextField()),
                ("total", models.FloatField()),
                ("paid_amount", models.FloatField()),
                ("due_amount", models.FloatField()),
                ("supplier", models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to="supplier.supplier")),
            ],
        ),
        migrations.CreateModel(
            name="PurchasedProduct",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                ("quantity", models.IntegerField(default=1)),
                ("price", models.FloatField(default=0.1)),
                ("total_price", models.FloatField(default=0)),
                ("bill_no", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name="purchase_bill_no", to="purchase.purchase")),
                ("product", models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to="product.product")),
            ],
        ),
    ]
