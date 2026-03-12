from channels.generic.websocket import AsyncJsonWebsocketConsumer
class DataIoT(AsyncJsonWebsocketConsumer):    
    def connect(self):
        print(self.accept())
        
        