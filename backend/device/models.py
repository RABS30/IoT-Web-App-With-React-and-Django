from django.db import models

import secrets
import string

class Device(models.Model) :
    idDevice= models.CharField(verbose_name="ID", max_length=10, unique=True, editable=False)
    name    = models.CharField(verbose_name="Device", max_length=100, unique=True)
    type    = models.CharField(verbose_name="Type", max_length=10, choices=[("sensor", "Sensor"), ("aktuator", "Aktuator")])
    
    
    def save(self, *args, **kwargs):
        if not self.idDevice :
            self.idDevice = self.generateUniqueID()
            super().save(*args, **kwargs)        
 
    def generateUniqueID(self):
        characters = string.ascii_uppercase + string.digits
        while True :
            id = "".join(secrets.choice(characters) for _ in range(10))
            if not Device.objects.filter(idDevice=id).exists():
                return id
            
    def __str__(self):
        return f"{self.name}, {self.idDevice}"
    
class Sensor(models.Model):
    device      = models.OneToOneField(Device, on_delete=models.CASCADE, limit_choices_to={'type': 'sensor'})
    maxValue    = models.IntegerField(verbose_name="Nilai maksimal")
    threshold   = models.IntegerField(verbose_name="Nilai ambang batas")
    status      = models.CharField(verbose_name="Status Sensor", max_length=3, choices=[("on", "On"), ("off", "Off")])
    measurement = models.CharField(verbose_name="Satuan Ukur", max_length=10)
    
    def save(self, *args, **kwargs):
        if self.device.type != "sensor":
            ValueError(f"Type must be Sensor can not ", self.device.type)
        else : 
            super().save(*args, **kwargs)      
            
    def __str__(self):
        return f"{self.device}"

class Actuator(models.Model):
    device          = models.OneToOneField(Device, verbose_name= "Device", on_delete=models.CASCADE, limit_choices_to={'type': 'aktuator'})
    status          = models.CharField(verbose_name="Status Aktuator", max_length=3, choices=[("on", "On"), ("off", "Off")])
    activation      = models.CharField(verbose_name="Aktifasi Aktuator", max_length=6, choices=[("sensor", "Berdasarkan Sensor"), ("manual", "Manual")])
    sensorTarget    = models.ForeignKey(Sensor, verbose_name="Sensor Target", on_delete=models.CASCADE, null=True, blank=True)
    activationValue = models.IntegerField(verbose_name="Nilai Aktifasi Aktuator", null=True, blank=True)
    compararison    = models.CharField(verbose_name="Perbandingan", max_length=10, choices=[("==", "=="), ("<=", "<="), (">=", ">=")], blank=True, null=True)
    
    def save(self, *args, **kwargs):
        if self.device.type != "aktuator" :
            raise ValueError(f"Type must be Actuator can not ", self.device.type)
        else :
            super().save(*args, **kwargs)
    
    
    def __str__(self):
        return f"{self.device}"
    