from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Unit",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("short_form", models.CharField(max_length=5, unique=True)),
                ("title", models.CharField(max_length=15)),
                ("detail", models.CharField(blank=True, max_length=255, null=True)),
            ],
        ),
    ]
