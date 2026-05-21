from django.core.management.base import BaseCommand
from product.models import Product
from stock.models import Stock
from supplier.models import Supplier
from purchase.models import Purchase
from sale.models import Sale


class Command(BaseCommand):

    def handle(self, *args, **kwargs):

        # 🔒 SAFETY CHECK (prevents duplicate seeding)
        if Product.objects.exists():
            self.stdout.write("Data already exists. Skipping seed.")
            return

        # ---------------- SUPPLIERS ----------------
        Supplier.objects.create(name="ABC Traders")
        Supplier.objects.create(name="Fresh Supply Ltd")

        # ---------------- PRODUCTS ----------------
        rice = Product.objects.create(name="Rice 5kg")
        oil = Product.objects.create(name="Soybean Oil 1L")
        sugar = Product.objects.create(name="Sugar 1kg")
        flour = Product.objects.create(name="Flour 2kg")
        salt = Product.objects.create(name="Salt 1kg")
        tea = Product.objects.create(name="Tea Pack")
        milk = Product.objects.create(name="Milk Powder")

        # ---------------- STOCK ----------------
        Stock.objects.create(product=rice, purchase_price=420, selling_price=500, quantity=20)
        Stock.objects.create(product=oil, purchase_price=160, selling_price=185, quantity=12)
        Stock.objects.create(product=sugar, purchase_price=105, selling_price=125, quantity=4)
        Stock.objects.create(product=flour, purchase_price=130, selling_price=160, quantity=8)
        Stock.objects.create(product=salt, purchase_price=25, selling_price=35, quantity=50)
        Stock.objects.create(product=tea, purchase_price=90, selling_price=120, quantity=15)
        Stock.objects.create(product=milk, purchase_price=300, selling_price=350, quantity=10)

        # ---------------- PURCHASES ----------------
        Purchase.objects.create(product=rice, quantity=20, total=8400)
        Purchase.objects.create(product=oil, quantity=12, total=1920)
        Purchase.objects.create(product=sugar, quantity=10, total=1050)
        Purchase.objects.create(product=flour, quantity=8, total=1040)

        # ---------------- SALES ----------------
        Sale.objects.create(product=rice, quantity=2, total=1000)
        Sale.objects.create(product=rice, quantity=3, total=1500)
        Sale.objects.create(product=oil, quantity=3, total=555)
        Sale.objects.create(product=oil, quantity=2, total=370)
        Sale.objects.create(product=sugar, quantity=2, total=250)
        Sale.objects.create(product=flour, quantity=2, total=320)
        Sale.objects.create(product=tea, quantity=1, total=120)
        Sale.objects.create(product=milk, quantity=1, total=350)
        Sale.objects.create(product=salt, quantity=5, total=175)

        self.stdout.write(self.style.SUCCESS("Demo data seeded successfully"))