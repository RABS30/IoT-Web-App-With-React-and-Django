from django.urls import path
from .views import DeviceListView, TypeListView


urlpatterns = [
    path("device/", DeviceListView),
    path("device/<pk>/toggle", DeviceListView),
    path("device/<str:type>/", TypeListView)
]