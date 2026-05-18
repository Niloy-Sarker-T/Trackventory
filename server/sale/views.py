from django.db import transaction
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.status import HTTP_201_CREATED, HTTP_400_BAD_REQUEST, HTTP_204_NO_CONTENT
from rest_framework.views import APIView

from sale.models import Sale, SoldProduct
from sale.serializers import SaleSerializer, SoldProductSerializer
from stock.models import Stock


class SaleView(APIView):
    def get(self, request, format=None):
        search = request.GET.get("search", "").strip()
        sales = Sale.objects.all().order_by("-created_at")
        if search:
            sales = sales.filter(customer__icontains=search)
        serializer = SaleSerializer(sales, many=True)
        return Response(serializer.data)

    @transaction.atomic
    def post(self, request, format=None):
        products = request.data.get("products", [])
        if not products:
            return Response({"products": ["At least one product is required."]}, status=HTTP_400_BAD_REQUEST)

        sale_data = request.data.copy()
        sale_data.pop("products", None)

        purchase_cost = 0
        total_price = 0
        stock_updates = []

        for item in products:
            product_id = item.get("product")
            quantity = int(item.get("quantity") or 0)
            price = float(item.get("price") or 0)
            if not product_id or quantity <= 0:
                return Response({"products": ["Each item needs product and positive quantity."]}, status=HTTP_400_BAD_REQUEST)

            stock = Stock.objects.select_for_update().filter(product_id=product_id).first()
            if not stock:
                return Response({"stock": [f"Product {product_id} is not in stock."]}, status=HTTP_400_BAD_REQUEST)
            if stock.quantity < quantity:
                return Response({"stock": [f"Only {stock.quantity} units available for {stock.product.name}."]}, status=HTTP_400_BAD_REQUEST)

            stock.quantity -= quantity
            stock_updates.append(stock)
            item["purchase_price"] = stock.unit_purchase_price
            item["total_price"] = quantity * price
            purchase_cost += quantity * stock.unit_purchase_price
            total_price += item["total_price"]

        discount = float(sale_data.get("discount") or 0)
        paid_amount = float(sale_data.get("paid_amount") or 0)
        sale_data["total_price"] = total_price - discount
        sale_data["purchase_cost"] = purchase_cost
        sale_data["profit"] = sale_data["total_price"] - purchase_cost
        sale_data["due_amount"] = max(sale_data["total_price"] - paid_amount, 0)

        serializer = SaleSerializer(data=sale_data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)

        sale = serializer.save()
        for stock in stock_updates:
            stock.save(update_fields=["quantity", "updated_at"])

        for item in products:
            item["sale"] = sale.id

        item_serializer = SoldProductSerializer(data=products, many=True)
        if item_serializer.is_valid():
            item_serializer.save()
            return Response(SaleSerializer(sale).data, status=HTTP_201_CREATED)
        raise ValueError(item_serializer.errors)


class SaleDetailView(APIView):
    def get(self, request, pk, format=None):
        sale = get_object_or_404(Sale, pk=pk)
        serializer = SaleSerializer(sale)
        return Response(serializer.data)

    def delete(self, request, pk, format=None):
        sale = get_object_or_404(Sale, pk=pk)
        sale.delete()
        return Response(status=HTTP_204_NO_CONTENT)
