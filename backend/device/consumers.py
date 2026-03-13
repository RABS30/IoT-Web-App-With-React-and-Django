import json
import redis

from channels.generic.websocket import AsyncJsonWebsocketConsumer



class DataIoT(AsyncJsonWebsocketConsumer):
    # Saat ada yang terkoneksi dengan websocket 
    async def connect(self):
        # Menerima pengguna yang masuk
        await self.accept()
        
        # Masukkan pengguna ke dalam group
        await self.channel_layer.group_add("latest_data", self.channel_name)
        
        # Mengirim pesan selamat datang
        await self.send_json({
            'message' : 'welcome to websocket'
        })
        
    async def disconnect(self, close_code):
        # Hapus pengguna dari group saat terputus koneksinya
        await self.channel_layer.group_discard("latest_data", self.channel_name)

    async def latest_data(self, event):
        data = event.get("data", {})
        await self.send_json({
            "type": "latest_data",
            "data": data
        })
        