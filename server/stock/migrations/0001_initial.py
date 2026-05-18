import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = [
        ("product", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="Stock",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                ("unit_purchase_price", models.FloatField()),
                ("unit_selling_price", models.FloatField()),
                ("quantity", models.IntegerField()),
                ("product", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to="product.product")),
            ],
        ),
    ]
