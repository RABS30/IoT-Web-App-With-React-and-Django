import os
import sys
import json
import django
import asyncio
import threading
import paho.mqtt.client as mqtt

from redis_worker import redis_client
from channels.layers import get_channel_layer

# ===================== MQTT CONFIG =====================
MQTT_SERVER = "broker.emqx.io"
MQTT_PORT = 1883
MQTT_KEEPALIVE = 60
MQTT_SUBSCRIBE = "monitoring/backend"

# ===================== DJANGO SETUP =====================
project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, project_root)

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "core.settings")
django.setup()

from device import models

channel_layer = get_channel_layer()

# ===================== WEBSOCKET BROADCAST =====================

async def broadcast_latest_data():
    while True:
        try:
            data = redis_client.hgetall("latest_data")

            await channel_layer.group_send(
                "latest_data",
                {
                    "type": "latest_data",
                    "data": data
                }
            )

        except Exception as e:
            print("Broadcast error:", e)

        await asyncio.sleep(1)

# ===================== MQTT CALLBACK =====================

def on_connect(client, userdata, flags, reasoncode, properties=None):
    if reasoncode == 0:
        print("MQTT Connected")
        client.subscribe(MQTT_SUBSCRIBE)
    else:
        print("MQTT Connect failed:", reasoncode)


def on_message(client, userdata, message):
    try:
        payload = json.loads(message.payload.decode())

        if payload["type"] == "latest_data":

            for sensor in payload["data"]:

                # push redis
                redis_client.hset(
                    "latest_data",
                    sensor["id"],
                    sensor["data"]
                )

                # push database
                # device = models.Device.objects.get(idDevice=sensor["id"])
                # models.ValueSensor.objects.create(device=device, value=int(sensor["data"]))

    except Exception as e:
        print("MQTT message error:", e)

# ===================== MQTT SETUP =====================

client = mqtt.Client()

client.on_connect = on_connect
client.on_message = on_message

client.connect(MQTT_SERVER, MQTT_PORT, MQTT_KEEPALIVE)

def mqtt_loop():
    client.loop_forever()

mqtt_thread = threading.Thread(target=mqtt_loop)
mqtt_thread.daemon = True
mqtt_thread.start()

# ===================== RUN ASYNC LOOP =====================

async def main():
    await broadcast_latest_data()

asyncio.run(main())