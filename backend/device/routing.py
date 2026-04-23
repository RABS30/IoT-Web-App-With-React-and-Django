from django.urls import re_path

from . import consumers

websocket_urlpatterns = [
    # re_path(r"^(?:api/)?ws/websocket-server/$", consumers.DataIoT.as_asgi()),
    re_path(r"api/ws/websocket-server/$", consumers.DataIoT.as_asgi()),
]