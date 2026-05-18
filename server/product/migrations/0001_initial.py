import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = [
        ("common", "0001_initial"),
        ("supplier", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="Product",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                ("name", models.CharField(max_length=63)),
                ("brand", models.CharField(max_length=50)),
                ("detail", models.TextField(blank=True, null=True)),
                ("supplier", models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to="supplier.supplier")),
                ("unit", models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to="common.unit")),
            ],
        ),
    ]
