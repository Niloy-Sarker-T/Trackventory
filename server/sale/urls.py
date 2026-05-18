from django.urls import path

from sale import views


urlpatterns = [
    path("sales/", views.SaleView.as_view(), name="sales"),
    path("sales/<int:pk>/", views.SaleDetailView.as_view(), name="sale_detail"),
]
