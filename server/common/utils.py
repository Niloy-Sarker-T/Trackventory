from django.core.management import call_command
from product.models import Product


def ensure_seed():
    if not Product.objects.exists():
        call_command("seed_demo")