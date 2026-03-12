import paho.mqtt.client as mqtt
import time
import json
import datetime
import random


# Konfigurasi MQTT
BROKER      = "broker.emqx.io"
PORT        = 1883
subscribe   = "monitoring/device"
backend     = "monitoring/backend"
frontend    = "monitoring/frontend"

# =========================================== #
# ============ CALLBACK FUNCTION ============ #

# Callback saat MQTT berhasil terkoneksi 
def onConnectCallback(client, userdata, flags, reasonCode, prop):
    # subscribe topic 
    client.subscribe(subscribe)

# Callback saat MQTT menerima data
def onMessageCallback(client, userdata, message):
    print("Ini args get message : ", message.payload.decode())



# =========================================== #
# ==============  RUNNING MQTT ============== #
# Membuat object MQTT Client
client = mqtt.Client(mqtt.CallbackAPIVersion.VERSION2)

# Menghubungkan callback
client.on_connect = onConnectCallback
client.on_message = onMessageCallback

# Hubungkan MQTT
client.connect(BROKER, PORT, 60)

# Menjalankan MQTT 
client.loop_start()

time.sleep(5)

while True:
    message = [
        {
            "id"   : "1NG9TNWSW86",
            "data"  : random.randint(10, 100)
        },
        {
            "id"   : "	A093GWIAMP",
            "chart": random.randint(10, 100)
        },
        {
            "id"   : "UMQ7CZIKEC",
            "chart": random.randint(10, 100)
        },
        {
            "id"   : "3IFNFPR9TQ",
            "chart": random.randint(10, 100)
        },
        {
            "id"   : "Z6GQM7NFPJ",
            "chart": random.randint(10, 100)
        },
        {
            "id"   : "6VLSODF9GD",
            "chart": random.randint(10, 100)
        },

    ]

    if client.is_connected() :
        # Mengirim data ke topic
        client.publish(backend, json.dumps(message))
        client.publish(frontend, json.dumps(message))
        # print("Message sent", message)
        time.sleep(1)
    else :
        print("Koneksi MQTT terputus")
        time.sleep(5)
