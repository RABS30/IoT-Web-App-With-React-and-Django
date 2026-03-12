from django.contrib import admin
from .models import Device, Sensor, ValueSensor, Actuator 

class DeviceModels(admin.ModelAdmin):
    list_display    = ("idDevice", "name", "type")
    list_filter     = ("name", "type", "idDevice")
    search_fields   = ("name", "type", "idDevice")


admin.site.register(Device, DeviceModels)
admin.site.register([Sensor, ValueSensor, Actuator])