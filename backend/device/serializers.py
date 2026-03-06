from rest_framework import serializers

from .models import Device, Actuator, Sensor



class SensorSerializers(serializers.ModelSerializer):
    class Meta :
        model   = Sensor
        fields  = '__all__'
        

class ActuatorSerializers(serializers.ModelSerializer):
    sensorTarget = SensorSerializers(read_only=True)
    class Meta :
        model   = Actuator
        fields  = '__all__'
    
class DeviceSerializers(serializers.ModelSerializer):
    
    sensor      = SensorSerializers(read_only=True)
    actuator    = ActuatorSerializers(read_only=True)
    
    class Meta :
        model   = Device
        fields  = '__all__'