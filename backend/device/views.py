import json

from django.db.models import Q

from django.shortcuts import render
from django.http import JsonResponse

from django.views.decorators.csrf import csrf_exempt

from .models import Device, Actuator, Sensor
from .serializers import SensorSerializers, DeviceSerializers


@csrf_exempt
def DeviceListView(request, *args):
    if request.method == "GET":
        # Variable Filter
        type_filter     = request.GET.get("type")
        status_filter   = request.GET.get("status")
        search_filter   = request.GET.get("search")
        
        # Ambil semua object
        devices         = Device.objects.all()

        # Filter type device
        if type_filter and type_filter != "all" :  
            devices = devices.filter(type=type_filter.lower())
            print("Filter pertama : \n ",devices)
            
        # Filter status device
        if status_filter and status_filter != "all" :
            if status_filter == "on":
                devices = devices.filter(Q(sensor__status=True) | Q(actuator__status=True))
                print("Filter kedua : \n ",devices)
            if status_filter == "off":
                devices = devices.filter(Q(sensor__status=False) | Q(actuator__status=False))
                print("Filter kedua : \n ",devices)

        # Filter searching device
        if search_filter and search_filter != "" :
            devices = devices.filter(name__icontains=search_filter) 
            print("Filter ketiga : \n ",devices)
            
        # Serialisasi
        serializerData  = DeviceSerializers(devices, many=True)
        
        # Return
        return JsonResponse(serializerData.data, safe=False)
    
    if request.method == "POST":
        body = json.loads(request.body)
        print(body)
        
        # New Data
        if body["post"] == "new":
            newDevice = Device.objects.create(name=body["name"], 
                                              type=body["type"])
            
            if body["type"] == "actuator" :
                Actuator.objects.create(device=newDevice, 
                                        status=body["status"], 
                                        activation=body["activation"], 
                                        sensorTarget=sensor, 
                                        activationValue=body["activationValue"], 
                                        compararison=body["comparison"])
            if body["type"] == "sensor" :
                Sensor.objects.create(device=newDevice, 
                                      maxValue=body["maxValue"], 
                                      threshold=body["threshold"], 
                                      status=body["status"], 
                                      measurement=body["measurement"], 
                                      chart=body["chart"])
            
        # Update Status Data
        if body["post"] == "statusUpdate":
            data = Device.objects.get(idDevice=body["idDevice"])
            
            if body["type"] == "sensor":
                sensor          = data.sensor
                sensor.status   = body["status"]
                sensor.save()            
            if body["type"] == "actuator":
                actuator        = data.actuator
                actuator.status = body["status"]
                actuator.save()
            
        dataDevice = Device.objects.all()
        
        dataDeviceSerializers = DeviceSerializers(dataDevice, many=True)           

        return JsonResponse(dataDeviceSerializers.data, status=200, safe=False)


def TypeListView(request, type, *args):
    if request.method == "GET":
        try :
            DeviceFilter = Device.objects.all().filter(type=type)
        except :
            raise Device.DoesNotExist
        
        print(DeviceFilter)
        DeviceFilter = DeviceSerializers(DeviceFilter, many=True)
        
        return JsonResponse(DeviceFilter.data , safe=False)





















