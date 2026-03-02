from django.urls import path
from .views import SensorListView


urlpatterns = [
    path("", SensorListView)
]