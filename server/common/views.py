from django.db.models import F, FloatField, Sum, Value
from django.db.models.functions import Coalesce, TruncDate
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_201_CREATED, HTTP_400_BAD_REQUEST

from common.serializers import UnitSerializer
from common.models import Unit
from product.models import Product
from purchase.models import Purchase
from sale.models import Sale
from stock.models import Stock
from supplier.models import Supplier

# 🔥 ADD THIS IMPORT
from common.utils import ensure_seed


class UnitList(APIView):

    def get(self, request, format=None):
        units = Unit.objects.all()
        serializer = UnitSerializer(units, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = UnitSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=HTTP_201_CREATED)
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)


class DashboardAnalyticsView(APIView):

    def get(self, request, format=None):

        # 🔥 AUTO-SEED (IMPORTANT FIX)
        ensure_seed()

        stock_value = Stock.objects.aggregate(
            value=Coalesce(
                Sum(F("quantity") * F("unit_purchase_price")),
                Value(0.0),
                output_field=FloatField()
            )
        )["value"]

        potential_sales_value = Stock.objects.aggregate(
            value=Coalesce(
                Sum(F("quantity") * F("unit_selling_price")),
                Value(0.0),
                output_field=FloatField()
            )
        )["value"]

        purchases = Purchase.objects.aggregate(
            total=Coalesce(Sum("total"), Value(0.0), output_field=FloatField()),
            paid=Coalesce(Sum("paid_amount"), Value(0.0), output_field=FloatField()),
            due=Coalesce(Sum("due_amount"), Value(0.0), output_field=FloatField()),
        )

        sales = Sale.objects.aggregate(
            total=Coalesce(Sum("total_price"), Value(0.0), output_field=FloatField()),
            paid=Coalesce(Sum("paid_amount"), Value(0.0), output_field=FloatField()),
            due=Coalesce(Sum("due_amount"), Value(0.0), output_field=FloatField()),
            profit=Coalesce(Sum("profit"), Value(0.0), output_field=FloatField()),
        )

        low_stock = list(
            Stock.objects.select_related("product")
            .filter(quantity__lte=5)
            .order_by("quantity")[:8]
            .values(
                "id",
                "quantity",
                "unit_selling_price",
                product_name=F("product__name")
            )
        )

        top_products = list(
            Stock.objects.select_related("product")
            .order_by("-quantity")[:8]
            .values(
                "id",
                "quantity",
                product_name=F("product__name")
            )
        )

        sales_by_day = list(
            Sale.objects.annotate(day=TruncDate("created_at"))
            .values("day")
            .annotate(
                earned=Coalesce(Sum("total_price"), Value(0.0), output_field=FloatField()),
                profit=Coalesce(Sum("profit"), Value(0.0), output_field=FloatField()),
            )
            .order_by("day")[:14]
        )

        purchases_by_day = list(
            Purchase.objects.annotate(day=TruncDate("created_at"))
            .values("day")
            .annotate(
                spent=Coalesce(Sum("total"), Value(0.0), output_field=FloatField())
            )
            .order_by("day")[:14]
        )

        recent_sales = list(
            Sale.objects.order_by("-created_at")[:6].values(
                "id",
                "customer",
                "total_price",
                "paid_amount",
                "due_amount",
                "profit",
                "created_at"
            )
        )

        recent_purchases = list(
            Purchase.objects.select_related("supplier")
            .order_by("-created_at")[:6]
            .values(
                "bill_no",
                "total",
                "paid_amount",
                "due_amount",
                "created_at",
                supplier_name=F("supplier__name")
            )
        )

        return Response({
            "counts": {
                "products": Product.objects.count(),
                "suppliers": Supplier.objects.count(),
                "stock_items": Stock.objects.count(),
                "purchases": Purchase.objects.count(),
                "sales": Sale.objects.count(),
            },
            "money": {
                "purchase_total": purchases["total"],
                "purchase_paid": purchases["paid"],
                "purchase_due": purchases["due"],
                "sales_total": sales["total"],
                "sales_paid": sales["paid"],
                "sales_due": sales["due"],
                "profit": sales["profit"],
                "stock_cost_value": stock_value,
                "stock_sales_value": potential_sales_value,
            },
            "low_stock": low_stock,
            "top_products": top_products,
            "sales_by_day": sales_by_day,
            "purchases_by_day": purchases_by_day,
            "recent_sales": recent_sales,
            "recent_purchases": recent_purchases,
        })