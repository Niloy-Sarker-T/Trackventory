from rest_framework import serializers

from purchase.models import Purchase, PurchasedProduct


class PurchaseSerializer(serializers.ModelSerializer):
    supplier_name = serializers.CharField(source='supplier.name', required=False, read_only=True)

    class Meta:
        model = Purchase
        fields = "__all__"


class PurchasedProductSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source='product.name', required=False, read_only=True)
    supplier = serializers.CharField(source='bill_no.supplier.name', required=False, read_only=True)
    class Meta:
        model = PurchasedProduct
        fields = "__all__"
