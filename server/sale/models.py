from django.db import models

from common.models import TimeStamp
from product.models import Product


class Sale(TimeStamp):
    details = models.TextField(blank=True)
    customer = models.CharField(max_length=255)
    total_price = models.FloatField(default=0)
    discount = models.FloatField(default=0)
    paid_amount = models.FloatField(default=0)
    due_amount = models.FloatField(default=0)
    purchase_cost = models.FloatField(default=0)
    profit = models.FloatField(default=0)

    def __str__(self):
        return f"Order-{self.id}"

    def get_sold_products(self):
        return SoldProduct.objects.filter(sale=self)


class SoldProduct(TimeStamp):
    sale = models.ForeignKey(Sale, on_delete=models.CASCADE, related_name="items")
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    quantity = models.IntegerField(default=1)
    price = models.FloatField(default=0)
    purchase_price = models.FloatField(default=0)
    total_price = models.FloatField(default=0)

    def __str__(self):
        return self.product.name if self.product else f"Sold product {self.id}"
