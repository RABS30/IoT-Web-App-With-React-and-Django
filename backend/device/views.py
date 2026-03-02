from django.shortcuts import render
from django.http import JsonResponse

from .models import Device, Actuator, Sensor
from .serializers import SensorSerializers

def SensorListView(request):
    if request.method == "GET":
        print(Sensor.objects.all())
        print(Sensor.objects.count())
        data            = Sensor.objects.all()
        
        serializerData  = SensorSerializers(data, many=True)
        
        return JsonResponse(serializerData.data, safe=False)
