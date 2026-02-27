import paho.mqtt.client as mqtt
import time
import json
import datetime
import random


# Konfigurasi MQTT
BROKER      = "broker.emqx.io"
PORT        = 1883
subscribe   = "monitoring/python"
publish     = "monitoring/microcontroler"

# =========================================== #
# ============ CALLBACK FUNCTION ============ #

# Callback saat MQTT berhasil terkoneksi 
def onConnectCallback(client, userdata, flags, reasonCode, prop):
    print("Ini client ", dir(client))
    # print("Ini userdata ", dir(userdata))
    # print("Ini flags ", dir(flags))
    print("Ini reasonCode ", dir(reasonCode))
    print("Ini prop ", dir(prop))

    # subscribe topic 
    client.subscribe(subscribe)

# Callback saat MQTT menerima data
def onMessageCallback(*args, **kwargs):
    print("Ini args get message : ", args )
    print("Ini kwargs get message :", kwargs)



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
            "name" : "Sensor 1",
            "data" : random.randint(10, 100),
            "date" : str(datetime.datetime.today())
        },
        {
            "name" : "Sensor 2",
            "data" : random.randint(10, 100),
            "date" : str(datetime.datetime.today())
        },
        {
            "name" : "Sensor 3",
            "data" : random.randint(10, 100),
            "date" : str(datetime.datetime.today())
        },

    ]

    if client.is_connected() :
        # Mengirim data ke topic
        client.publish(publish, json.dumps(message))
        # print("Message sent", message)
        time.sleep(5)
    else :
        print("Koneksi MQTT terputus")
        time.sleep(5)
