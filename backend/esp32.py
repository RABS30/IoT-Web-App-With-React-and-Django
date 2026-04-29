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
print("===== ESP32 RUNNING =====")
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
    message = {
            'type' : 'latest_data',
            'data' : [{
                    "id"   : "BVN6P4D51Z",
                    "data" : random.randint(10, 100)
                },
                {
                    "id"    : "DBD37PY7NC",
                    "data"  : random.randint(10, 100)
                },
                {
                    "id"    : "QZRVZUSXXG",
                    "data"  : random.randint(10, 100)
                },
                {
                    "id"    : "1Z1R9O0OCN",
                    "data"  : random.randint(10, 100)
                },
                {
                    "id"    : "RG19R6FSMW",
                    "data"  : random.randint(10, 100)
                },
                {
                    "id"   : "MBB5G2C245",
                    "data" : random.randint(10, 100)
                },
                ]
        }

    if client.is_connected() :
        # Mengirim data ke topic
        client.publish(backend, json.dumps(message))
        client.publish(frontend, json.dumps(message))
        # print("Message sent", message)
        time.sleep(1)
    else :
        print("Koneksi MQTT terputus")
        time.sleep(5)
