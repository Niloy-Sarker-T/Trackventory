from django.urls import path

from common import views

urlpatterns = [
    path('units/', views.UnitList.as_view(), name='units' ),
    path('analytics/dashboard/', views.DashboardAnalyticsView.as_view(), name='dashboard_analytics' ),
]
