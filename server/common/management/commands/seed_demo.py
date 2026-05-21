from django.core.management.base import BaseCommand

from product.models import Product
from stock.models import Stock
from supplier.models import Supplier

from purchase.models import Purchase, PurchasedProduct
from sale.models import Sale, SoldProduct


class Command(BaseCommand):

    def handle(self, *args, **kwargs):

        # Prevent duplicate seed
        if Stock.objects.exists():
            return

        # Suppliers
        supplier1 = Supplier.objects.create(name="ABC Traders")
        supplier2 = Supplier.objects.create(name="Fresh Supply Ltd")

        # Products
        rice = Product.objects.create(name="Rice 5kg")
        oil = Product.objects.create(name="Soybean Oil 1L")
        sugar = Product.objects.create(name="Sugar 1kg")
        flour = Product.objects.create(name="Flour 2kg")
        salt = Product.objects.create(name="Salt 1kg")
        tea = Product.objects.create(name="Tea Pack")
        milk = Product.objects.create(name="Milk Powder")

        # Stock
        Stock.objects.create(
            product=rice,
            unit_purchase_price=420,
            unit_selling_price=500,
            quantity=20
        )

        Stock.objects.create(
            product=oil,
            unit_purchase_price=160,
            unit_selling_price=185,
            quantity=12
        )

        Stock.objects.create(
            product=sugar,
            unit_purchase_price=105,
            unit_selling_price=125,
            quantity=4
        )

        Stock.objects.create(
            product=flour,
            unit_purchase_price=130,
            unit_selling_price=160,
            quantity=8
        )

        Stock.objects.create(
            product=salt,
            unit_purchase_price=25,
            unit_selling_price=35,
            quantity=50
        )

        Stock.objects.create(
            product=tea,
            unit_purchase_price=90,
            unit_selling_price=120,
            quantity=15
        )

        Stock.objects.create(
            product=milk,
            unit_purchase_price=300,
            unit_selling_price=350,
            quantity=10
        )

        # Purchases
        purchase1 = Purchase.objects.create(
            supplier=supplier1,
            note="Initial rice purchase",
            total=8400,
            paid_amount=8400,
            due_amount=0
        )

        PurchasedProduct.objects.create(
            bill_no=purchase1,
            product=rice,
            quantity=20,
            price=420,
            total_price=8400
        )

        purchase2 = Purchase.objects.create(
            supplier=supplier2,
            note="Oil stock purchase",
            total=1920,
            paid_amount=1500,
            due_amount=420
        )

        PurchasedProduct.objects.create(
            bill_no=purchase2,
            product=oil,
            quantity=12,
            price=160,
            total_price=1920
        )

        purchase3 = Purchase.objects.create(
            supplier=supplier1,
            note="Sugar and flour stock",
            total=2090,
            paid_amount=2000,
            due_amount=90
        )

        PurchasedProduct.objects.create(
            bill_no=purchase3,
            product=sugar,
            quantity=10,
            price=105,
            total_price=1050
        )

        PurchasedProduct.objects.create(
            bill_no=purchase3,
            product=flour,
            quantity=8,
            price=130,
            total_price=1040
        )

        purchase4 = Purchase.objects.create(
            supplier=supplier2,
            note="Tea and milk stock",
            total=4350,
            paid_amount=4000,
            due_amount=350
        )

        PurchasedProduct.objects.create(
            bill_no=purchase4,
            product=tea,
            quantity=15,
            price=90,
            total_price=1350
        )

        PurchasedProduct.objects.create(
            bill_no=purchase4,
            product=milk,
            quantity=10,
            price=300,
            total_price=3000
        )


        # Sales
        sale1 = Sale.objects.create(
            customer="Karim Ahmed",
            details="Retail sale",
            total_price=1000,
            discount=0,
            paid_amount=1000,
            due_amount=0,
            purchase_cost=840,
            profit=160
        )

        SoldProduct.objects.create(
            sale=sale1,
            product=rice,
            quantity=2,
            price=500,
            purchase_price=420,
            total_price=1000
        )

        sale2 = Sale.objects.create(
            customer="Nusrat Jahan",
            details="Retail sale",
            total_price=555,
            discount=0,
            paid_amount=555,
            due_amount=0,
            purchase_cost=480,
            profit=75
        )

        SoldProduct.objects.create(
            sale=sale2,
            product=oil,
            quantity=3,
            price=185,
            purchase_price=160,
            total_price=555
        )

        sale3 = Sale.objects.create(
            customer="Rahim Store",
            details="Wholesale order",
            total_price=625,
            discount=0,
            paid_amount=500,
            due_amount=125,
            purchase_cost=525,
            profit=100
        )

        SoldProduct.objects.create(
            sale=sale3,
            product=sugar,
            quantity=5,
            price=125,
            purchase_price=105,
            total_price=625
        )

        sale4 = Sale.objects.create(
            customer="Mim Enterprise",
            details="Retail purchase",
            total_price=640,
            discount=0,
            paid_amount=640,
            due_amount=0,
            purchase_cost=520,
            profit=120
        )

        SoldProduct.objects.create(
            sale=sale4,
            product=flour,
            quantity=4,
            price=160,
            purchase_price=130,
            total_price=640
        )

        sale5 = Sale.objects.create(
            customer="Tanvir Hasan",
            details="Tea purchase",
            total_price=360,
            discount=0,
            paid_amount=300,
            due_amount=60,
            purchase_cost=270,
            profit=90
        )

        SoldProduct.objects.create(
            sale=sale5,
            product=tea,
            quantity=3,
            price=120,
            purchase_price=90,
            total_price=360
        )

        sale6 = Sale.objects.create(
            customer="Nabila Traders",
            details="Milk and salt order",
            total_price=875,
            discount=0,
            paid_amount=875,
            due_amount=0,
            purchase_cost=625,
            profit=250
        )

        SoldProduct.objects.create(
            sale=sale6,
            product=milk,
            quantity=2,
            price=350,
            purchase_price=300,
            total_price=700
        )

        SoldProduct.objects.create(
            sale=sale6,
            product=salt,
            quantity=5,
            price=35,
            purchase_price=25,
            total_price=175
        )

        self.stdout.write(self.style.SUCCESS("Demo data seeded successfully"))