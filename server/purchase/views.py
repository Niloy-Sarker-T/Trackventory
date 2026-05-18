from django.db import transaction
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.status import HTTP_201_CREATED, HTTP_400_BAD_REQUEST, HTTP_204_NO_CONTENT
from rest_framework.response import Response

from purchase.models import Purchase, PurchasedProduct
from purchase.serializers import PurchaseSerializer, PurchasedProductSerializer
from stock.models import Stock


# Create your views here.
class PurchaseView(APIView):
    def get(self, request, format=None):
        search = request.GET.get("search", "").strip()
        purchases = Purchase.objects.select_related("supplier").all().order_by("-created_at")
        if search:
            purchases = purchases.filter(supplier__name__icontains=search) | purchases.filter(note__icontains=search)
        serializer = PurchaseSerializer(purchases, many=True)
        return Response(serializer.data)

    @transaction.atomic
    def post(self, request, format=None):
        serializer = PurchaseSerializer(data=request.data)
        if serializer.is_valid():
            purchase = serializer.save()
            for i, product in enumerate(request.data['products']):
                request.data['products'][i]['bill_no'] = purchase.bill_no

            serializer = PurchasedProductSerializer(data=request.data['products'], many=True)
            if serializer.is_valid():
                purchased_items = serializer.save()
                for item in purchased_items:
                    stock, created = Stock.objects.select_for_update().get_or_create(
                        product=item.product,
                        defaults={
                            "unit_purchase_price": item.price,
                            "unit_selling_price": item.price,
                            "quantity": 0,
                        },
                    )
                    stock.quantity += item.quantity
                    stock.unit_purchase_price = item.price
                    if created or not stock.unit_selling_price:
                        stock.unit_selling_price = item.price
                    stock.save()
                return Response(serializer.data, status=HTTP_201_CREATED)
            else:
                purchase.delete()
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)


class PurchaseDetailView(APIView):
    def get(self, request, pk, format=None):
        purchase = get_object_or_404(Purchase, pk=pk)
        serializer = PurchaseSerializer(purchase)
        products = purchase.get_purchased_products()
        serializer2 = PurchasedProductSerializer(products, many=True)
        data = serializer.data
        data['products'] = serializer2.data
        return Response(data)

    def delete(self, request, pk, format=None):
        purchase = get_object_or_404(Purchase, pk=pk)
        for item in purchase.get_purchased_products():
            stock = Stock.objects.filter(product=item.product).first()
            if stock:
                stock.quantity = max(stock.quantity - item.quantity, 0)
                stock.save(update_fields=["quantity", "updated_at"])
        purchase.delete()
        return Response(status=HTTP_204_NO_CONTENT)



class PurchasedProductsView(APIView):
    def get(self, request, format=None):
        purchased_products = PurchasedProduct.objects.all()
        serializer = PurchasedProductSerializer(purchased_products, many=True)
        return Response(serializer.data)
