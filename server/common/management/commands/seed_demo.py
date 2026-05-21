from django.core.management.base import BaseCommand

from product.models import Product
from stock.models import Stock
from supplier.models import Supplier
from purchase.models import Purchase, PurchasedProduct
from sale.models import Sale, SoldProduct


class Command(BaseCommand):
    help = "Seed demo data for dashboard analytics"

    def handle(self, *args, **kwargs):

        # ---------------------------
        # OPTIONAL CLEAN RESET
        # ---------------------------
        if Stock.objects.exists():
            self.stdout.write("Demo data already exists. Skipping seed.")
            return

        # ---------------------------
        # SUPPLIERS
        # ---------------------------
        supplier1 = Supplier.objects.create(name="ABC Traders")
        supplier2 = Supplier.objects.create(name="Fresh Supply Ltd")

        # ---------------------------
        # PRODUCTS
        # ---------------------------
        rice = Product.objects.create(name="Rice 5kg")
        oil = Product.objects.create(name="Soybean Oil 1L")
        sugar = Product.objects.create(name="Sugar 1kg")
        flour = Product.objects.create(name="Flour 2kg")
        salt = Product.objects.create(name="Salt 1kg")
        tea = Product.objects.create(name="Tea Pack")
        milk = Product.objects.create(name="Milk Powder")

        # ---------------------------
        # STOCK
        # ---------------------------
        Stock.objects.create(product=rice, unit_purchase_price=420, unit_selling_price=500, quantity=20)
        Stock.objects.create(product=oil, unit_purchase_price=160, unit_selling_price=185, quantity=12)
        Stock.objects.create(product=sugar, unit_purchase_price=105, unit_selling_price=125, quantity=4)
        Stock.objects.create(product=flour, unit_purchase_price=130, unit_selling_price=160, quantity=8)
        Stock.objects.create(product=salt, unit_purchase_price=25, unit_selling_price=35, quantity=50)
        Stock.objects.create(product=tea, unit_purchase_price=90, unit_selling_price=120, quantity=15)
        Stock.objects.create(product=milk, unit_purchase_price=300, unit_selling_price=350, quantity=10)

        # ---------------------------
        # PURCHASES (BILLS)
        # ---------------------------

        p1 = Purchase.objects.create(
            supplier=supplier1,
            note="Rice + Oil stock purchase",
            total=10320,
            paid_amount=10000,
            due_amount=320
        )

        PurchasedProduct.objects.create(
            bill_no=p1,
            product=rice,
            quantity=20,
            price=420,
            total_price=8400
        )

        PurchasedProduct.objects.create(
            bill_no=p1,
            product=oil,
            quantity=12,
            price=160,
            total_price=1920
        )

        p2 = Purchase.objects.create(
            supplier=supplier2,
            note="Sugar + Flour + Tea stock",
            total=4440,
            paid_amount=4000,
            due_amount=440
        )

        PurchasedProduct.objects.create(
            bill_no=p2,
            product=sugar,
            quantity=10,
            price=105,
            total_price=1050
        )

        PurchasedProduct.objects.create(
            bill_no=p2,
            product=flour,
            quantity=8,
            price=130,
            total_price=1040
        )

        PurchasedProduct.objects.create(
            bill_no=p2,
            product=tea,
            quantity=15,
            price=90,
            total_price=1350
        )

        # ---------------------------
        # SALES (ORDERS)
        # ---------------------------

        s1 = Sale.objects.create(
            customer="Karim Ahmed",
            details="Retail sale",
            total_price=1000,
            paid_amount=1000,
            due_amount=0,
            profit=200
        )

        SoldProduct.objects.create(
            sale=s1,
            product=rice,
            quantity=2,
            price=500,
            purchase_price=420,
            total_price=1000
        )

        s2 = Sale.objects.create(
            customer="Nusrat Jahan",
            details="Retail sale",
            total_price=555,
            paid_amount=555,
            due_amount=0,
            profit=75
        )

        SoldProduct.objects.create(
            sale=s2,
            product=oil,
            quantity=3,
            price=185,
            purchase_price=160,
            total_price=555
        )

        s3 = Sale.objects.create(
            customer="Rahim Uddin",
            details="Grocery sale",
            total_price=250,
            paid_amount=250,
            due_amount=0,
            profit=30
        )

        SoldProduct.objects.create(
            sale=s3,
            product=sugar,
            quantity=2,
            price=125,
            purchase_price=105,
            total_price=250
        )

        s4 = Sale.objects.create(
            customer="Ayesha Rahman",
            details="Daily items",
            total_price=320,
            paid_amount=320,
            due_amount=0,
            profit=50
        )

        SoldProduct.objects.create(
            sale=s4,
            product=flour,
            quantity=2,
            price=160,
            purchase_price=130,
            total_price=320
        )

        s5 = Sale.objects.create(
            customer="Tanvir Hasan",
            details="Tea + Milk combo",
            total_price=470,
            paid_amount=470,
            due_amount=0,
            profit=90
        )

        SoldProduct.objects.create(
            sale=s5,
            product=tea,
            quantity=1,
            price=120,
            purchase_price=90,
            total_price=120
        )

        SoldProduct.objects.create(
            sale=s5,
            product=milk,
            quantity=1,
            price=350,
            purchase_price=300,
            total_price=350
        )

        s6 = Sale.objects.create(
            customer="Demo Customer",
            details="Mixed items",
            total_price=175,
            paid_amount=175,
            due_amount=0,
            profit=25
        )

        SoldProduct.objects.create(
            sale=s6,
            product=salt,
            quantity=5,
            price=35,
            purchase_price=25,
            total_price=175
        )

        self.stdout.write(self.style.SUCCESS("Demo data seeded successfully"))