from django.shortcuts import render
from django.http import JsonResponse

from .models import Device, Actuator, Sensor
from .serializers import SensorSerializers, DeviceSerializers

def DeviceListView(request):
    if request.method == "GET":
        print(Device.objects.all())
        print(Device.objects.count())
        data            = Device.objects.all()
        
        serializerData  = DeviceSerializers(data, many=True)
        
        return JsonResponse(serializerData.data, safe=False)
