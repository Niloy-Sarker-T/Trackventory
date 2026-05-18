from rest_framework import serializers

from sale.models import Sale, SoldProduct


class SoldProductSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source="product.name", required=False, read_only=True)

    class Meta:
        model = SoldProduct
        fields = "__all__"


class SaleSerializer(serializers.ModelSerializer):
    products = SoldProductSerializer(source="items", many=True, required=False, read_only=True)

    class Meta:
        model = Sale
        fields = "__all__"
