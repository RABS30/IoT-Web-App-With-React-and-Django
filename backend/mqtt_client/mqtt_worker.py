import os
import sys
import django
import paho.mqtt.client as mqtt


# MQTT Configuration
MQTT_SERVER     = "broker.emqx.io"
MQTT_PORT       = 1883
MQTT_KEEPALIVE  = 60
MQTT_SUBSCRIBE  = "monitoring/backend"


# tambahkan root project ke path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "core.settings")
django.setup()


def on_connect(client, userdata, flags, reasoncode):
    if reasoncode == 0 :
        print("MQTT Connected")
        client.subscribe(MQTT_SUBSCRIBE)
        
def on_message(client, userdata, message):
    print(f"Ini data yang diterima : {message.payload.decode()}")
    
    
client = mqtt.Client()
client.on_connect = on_connect
client.on_message = on_message

client.connect(MQTT_SERVER, MQTT_PORT, MQTT_KEEPALIVE)  

client.loop_forever()