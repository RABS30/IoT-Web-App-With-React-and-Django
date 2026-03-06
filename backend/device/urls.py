from django.urls import path
from .views import DeviceListView


urlpatterns = [
    path("device/", DeviceListView),
    path("device/<pk>/toggle", DeviceListView)
]