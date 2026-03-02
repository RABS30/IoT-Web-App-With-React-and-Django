from django.contrib import admin


from .models import Device, Sensor, Actuator 
# Register your models here.
admin.site.register([Device, Sensor, Actuator])