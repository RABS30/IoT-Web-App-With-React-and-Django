from rest_framework import serializers

from .models import Device, Actuator, Sensor



class SensorSerializers(serializers.ModelSerializer):
    class Meta :
        model   = Sensor
        fields  = '__all__'