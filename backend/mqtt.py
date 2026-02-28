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
            "id"   : "1",
            "name" : "Sensor 1",
            "data" : random.randint(10, 100),
            "date" : str(datetime.datetime.today()),
            "chart": "doughnut"
        },
        {
            "id"   : "2",
            "name" : "Sensor 2",
            "data" : random.randint(10, 100),
            "date" : str(datetime.datetime.today()),
            "chart": "bar"
        },
        {
            "id"   : "3",
            "name" : "Sensor 3",
            "data" : random.randint(10, 100),
            "date" : str(datetime.datetime.today()),
            "chart": "bar"
        },
        {
            "id"   : "4",
            "name" : "Sensor 1",
            "data" : random.randint(10, 100),
            "date" : str(datetime.datetime.today()),
            "chart": "doughnut"
        },
        {
            "id"   : "5",
            "name" : "Sensor 2",
            "data" : random.randint(10, 100),
            "date" : str(datetime.datetime.today()),
            "chart": "bar"
        },
        {
            "id"   : "6",
            "name" : "Sensor 3",
            "data" : random.randint(10, 100),
            "date" : str(datetime.datetime.today()),
            "chart": "bar"
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
