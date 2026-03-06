import json

from django.shortcuts import render
from django.http import JsonResponse

from django.views.decorators.csrf import csrf_exempt

from .models import Device, Actuator, Sensor
from .serializers import SensorSerializers, DeviceSerializers


@csrf_exempt
def DeviceListView(request, *args):
    if request.method == "GET":
        print(Device.objects.all())
        print(Device.objects.count())
        data            = Device.objects.all()
        
        serializerData  = DeviceSerializers(data, many=True)
        
        return JsonResponse(serializerData.data, safe=False)
    
    if request.method == "POST":
        body = json.loads(request.body)
        print(body)
        data = Device.objects.get(idDevice=body["idDevice"])
        
        if body["type"] == "sensor":
            sensor          = data.sensor
            print(sensor.status)
            sensor.status   = body["status"]
            sensor.save()            
            print(sensor.status)
        if body["type"] == "aktuator":
            actuator        = data.actuator
            print(actuator.status)
            actuator.status = body["status"]
            actuator.save()
            print(actuator.status)
        return JsonResponse({"information": "Good POST"}, status=200)
