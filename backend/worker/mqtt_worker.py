import os
import sys
import json
import django
import threading
import paho.mqtt.client as mqtt
# Redis library
from redis_worker import redis_client
# websocket library
import asyncio
from channels.layers import get_channel_layer

# ===================== MQTT VARIABLE CONFIG ========================
MQTT_SERVER     = "broker.emqx.io"
MQTT_PORT       = 1883
MQTT_KEEPALIVE  = 60
MQTT_SUBSCRIBE  = "monitoring/backend"


# ===================== SETTING ROOT PROJECT ========================
project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, project_root)
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "core.settings")
django.setup()
# import database django
from device import models


# ======================= WEBSOCKET CHANNELS =======================
# Send latest data to channels from redis 
async def broadcast_latest_data():
    while True :
        print('send data')
        await get_channel_layer().group_send(
            "latest_data",
            {
                "type": "latest_data",
                "data": redis_client.hgetall('latest_data')
            }
        )

        await asyncio.sleep(1)


# ======================= CALLBACK MQTT =======================
# Callback = Saat MQTT Terhubung
def on_connect(client, userdata, flags, reasoncode):
    if reasoncode == 0:
        print("MQTT Connected")
        client.subscribe(MQTT_SUBSCRIBE)
    else:
        print("MQTT Connect failed:", reasoncode)      
        
# Callback = Saat menerima message dari MQTT
def on_message(client, userdata, message):
    data = message.payload.decode()
    data = json.loads(data)
    
    # Push data to redis and database
    if data['type'] == 'latest_data' :
        for sensor in data['data']:
            # push to redis
            redis_client.hset("latest_data", sensor['id'], sensor['data'])
            # push to database
            device = models.Device.objects.get(idDevice=sensor["id"])
            models.ValueSensor.objects.create(device=device, value=int(sensor["data"]))
    
    

        
# ======================= SETUP MQTT =======================
    # Buat object mqtt dan masukkan callback ke mqtt
client = mqtt.Client()
client.on_connect = on_connect
client.on_message = on_message
    # Connect MQTT
client.connect(MQTT_SERVER, MQTT_PORT, MQTT_KEEPALIVE)  
    # Running MQTT
threading.Thread(target=client.loop_forever, daemon=True).start()

# ======================= SETUP CHANNELS =======================
    # Running Channels Redis
asyncio.run(broadcast_latest_data())