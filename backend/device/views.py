import json

from django.db.models import Q
from django.db import transaction
from django.db import IntegrityError


from django.http import JsonResponse

from .models import Device, Actuator, Sensor
from .serializers import  DeviceSerializers

from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view



@api_view(['GET', 'POST'])
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
        print('ini data yang masuk : ', body)
    # ===== CREATE DATA =====
        if body["post"] == "new":
            try :
                with transaction.atomic():
                    # Buat device
                    newDevice = Device.objects.create(name=body["name"], type=body["type"])

                    
                    # Jika tipe == Actuator
                    if body['type'] == 'actuator' :   
                        try :
                            sensor = Device.objects.get(idDevice=body['sensorTarget'])
                            sensor = Sensor.objects.get(device=sensor)
                            actuator = Actuator.objects.create(device=newDevice, 
                                                    status=body["status"], 
                                                    activation=body["activation"], 
                                                    sensorTarget=sensor, 
                                                    activationValue=body["activationValue"], 
                                                    comparison=body["comparison"])

                        except :
                            actuator = Actuator.objects.create(device=newDevice, 
                                                    status=body["status"], 
                                                    activation=body["activation"], 
                                                    activationValue=body["activationValue"], 
                                                    comparison=body["comparison"])
                            
                        
                    # Jika tipe == Sensor
                    if body["type"] == "sensor" :
                        
                        sensor = Sensor.objects.create( device=newDevice, 
                                                        maxValue=int(body.get("maxValue") or 0), # Konversi ke int
                                                        threshold=int(body.get("threshold") or 0),
                                                        status=body["status"], 
                                                        measurement=body["measurement"], 
                                                        chart=body["chart"])
                    
            except IntegrityError as error:
                nama = body.get('name', 'Device')
                print(error)
                return Response(
                    {'message': f'"{nama}" sudah ada, tolong buat dengan nama yang berbeda'}, 
                    status=status.HTTP_400_BAD_REQUEST
                )

            except Exception as error :
                print(error)
                return Response({"message": str(error)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
            
    # ===== UPDATE DATA =====
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
        
        
    # ====== RETURN DATA =====
        # Ambil data    
        dataDevice = Device.objects.all()
        # Serialisasi data
        dataDeviceSerializers = DeviceSerializers(dataDevice, many=True)           
        return JsonResponse(dataDeviceSerializers.data, status=200, safe=False)


def TypeListView(request, type, *args):
    if request.method == "GET":
        deviceList = Device.objects.select_related(
            'actuator',
            'sensor',
        ).filter(type=type)
        
        deviceList   = DeviceSerializers(deviceList, read_only=True, many=True)
        return JsonResponse(deviceList.data, safe=False)



















