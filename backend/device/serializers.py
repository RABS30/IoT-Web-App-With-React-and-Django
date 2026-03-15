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
    
# class DeviceSerializers(serializers.ModelSerializer):
    
#     sensor      = SensorSerializers(read_only=True)
#     actuator    = ActuatorSerializers(read_only=True)
    
#     class Meta :
#         model   = Device
#         fields  = '__all__'
        
        
class DeviceSerializers(serializers.ModelSerializer):
    # Actuator Fields
    status_actuator = serializers.SerializerMethodField()
    activation      = serializers.SerializerMethodField()
    sensorTarget    = serializers.SerializerMethodField()
    activationValue = serializers.SerializerMethodField()
    comparison      = serializers.SerializerMethodField()
    last_activation = serializers.SerializerMethodField()
    id_sensor       = serializers.SerializerMethodField()
    
    # Sensor Fields
    maxValue        = serializers.SerializerMethodField()
    threshold       = serializers.SerializerMethodField()
    status_sensor   = serializers.SerializerMethodField()
    measurement     = serializers.SerializerMethodField()
    chart           = serializers.SerializerMethodField()
    
    class Meta :
        model   = Device
        fields  = [
            # Device fields
            'idDevice', 
            'name', 
            'type',
            
            # Actuator fields
            'status_actuator',
            'activation',
            'sensorTarget',
            'activationValue',
            'comparison',
            'last_activation',
            'id_sensor',
            
            # Sensor fields
            'maxValue',
            'threshold',
            'status_sensor',
            'measurement',
            'chart',
        ]     
        
    def get_status_actuator(self, obj):
        if hasattr(obj, 'actuator'):
            return obj.actuator.status
        return None
    
    def get_activation(self, obj):
        if hasattr(obj, 'actuator'):
            return obj.actuator.activation
        
    def get_sensorTarget(self, obj):
        if hasattr(obj, 'actuator'):
            return obj.actuator.sensorTarget.device.name
        return None
    
    def get_activationValue(self, obj):
        if hasattr(obj, 'actuator'):
            return obj.actuator.activationValue
        return None
    
    def get_comparison(self, obj):
        if hasattr(obj, 'actuator'):
            return obj.actuator.comparison
        return None
    
    def get_last_activation(self, obj):
        if hasattr(obj, 'actuator'):
            return obj.actuator.last_activation.strftime("%H:%M %d-%m-%Y ")
        return None
    
    def get_id_sensor(self, obj):
        if hasattr(obj, 'actuator'):
            return obj.actuator.sensorTarget.device.idDevice
        return None

    def get_maxValue(self, obj):
        if hasattr(obj, 'sensor'):
            return obj.sensor.maxValue
        return None    
    
    def get_threshold(self, obj):
        if hasattr(obj, 'sensor'):
            return obj.sensor.threshold
        
        return None    
    def get_status_sensor(self, obj):
        if hasattr(obj, 'sensor'):
            return obj.sensor.status
        
        return None    
    def get_measurement(self, obj):
        if hasattr(obj, 'sensor'):
            return obj.sensor.measurement
        return None    
    
    def get_chart(self, obj):
        if hasattr(obj, 'sensor'):
                return obj.sensor.chart    
        return None    
