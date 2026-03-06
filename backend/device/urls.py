from django.urls import path
from .views import DeviceListView


urlpatterns = [
    path("", DeviceListView)
]