from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Supplier",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                ("supplier_code", models.CharField(max_length=63)),
                ("name", models.CharField(max_length=31)),
                ("designation", models.CharField(max_length=15)),
                ("primary_phone", models.CharField(max_length=15)),
                ("secondary_phone", models.CharField(blank=True, max_length=15, null=True)),
                ("email", models.EmailField(blank=True, max_length=254, null=True)),
                ("company", models.CharField(max_length=31)),
                ("address", models.TextField()),
            ],
        ),
    ]
