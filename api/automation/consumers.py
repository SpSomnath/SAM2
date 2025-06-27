import uuid
import json
import base64
from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
from django.core.files.base import ContentFile
from .serializers import UserSerializer, DeviceSerializer, DeviceDataSerializer
from .models import Device, DeviceData


class AutomationConsumer(WebsocketConsumer):

    def connect(self):
        user = self.scope['user']
        print(user , user.is_authenticated)
        if not user.is_authenticated:
            return
        self.username = user.username
        #join this user to the group with their username
        async_to_sync(self.channel_layer.group_add)(
            self.username, self.channel_name
        )
        
        self.accept()
    
    def disconnect(self, close_code):
        # remove user from group 
        async_to_sync(self.channel_layer.group_discard)(
            self.username, self.channel_name
        )
        print(f"Disconnected with close code: {close_code}")


    # -------------------------
    #   handle requests
    # -------------------------


    def receive(self, text_data):
        data = json.loads(text_data)
        data_source = data.get('source')
        print('recive', json.dumps(data, indent=2) )

        # thumbnail upload 
        if data_source == 'thumbnail':
            print('recive thumbnail request')
            self.recive_thumbnail(data)
        elif data_source == 'add_device':
            self.add_device(data)
        elif data_source == 'fetch_devices':
            self.device_request(data)
        elif data_source == 'device_data_request':
            self.device_data_request(data)

    def add_device(self, data):
        user = self.scope['user']
        
        # Access the nested data
        device_data = data.get('data', {})
        device_name = device_data.get('device_name') or device_data.get('deviceName')
        location = device_data.get('location')
        device_id = device_data.get('device_id') or device_data.get('deviceId')
        
        # Optionally accept status, but default to "active" if not provided
        status = device_data.get('status', 'active')

        # If device_id is not provided, generate one
        if not device_id:
            device_id = f"{device_name}_{user.id}_{uuid.uuid4()}"

        # Ensure required fields are present
        if not device_name or not location:
            self.send(text_data=json.dumps({
                "source": "add_device",
                "error": "Missing required fields"
            }))
            return

        # Create and save the device
        device = Device(
            user=user,
            device_id=device_id,
            device_name=device_name,
            location=location,
            status=status,
        )
        print(f'device details: {device}')
        device.save()

        serialized = DeviceSerializer(device)
        self.send_group(self.username, 'Device', serialized.data)

        
    def device_request(self, data):
        user = self.scope['user']
        device = Device.objects.filter(user=user)
        serialized = DeviceSerializer(device, many=True)
        print('devices:', serialized.data)
        self.send_group(self.username, 'devices', serialized.data)
    
    def device_data_request(self , data):
        user = self.scope['user']
        device_id = data.get('id')
        device = Device.objects.get(user=user, device_id=device_id)
        serializer = DeviceDataSerializer(device.data.all(), many=True)
        print('Device data:', serializer.data)
        self.send_group(self.username, 'deviceData', serializer.data)


    def recive_thumbnail(self, data):
        user = self.scope['user']
        # convert base64 data to django content file 
        image_str = data.get('base64')
        image = ContentFile(base64.b64decode(image_str))
        # Save thumbnail
        filename = data.get('filename')
        user.thumbnail.save(filename, image, save=True)
        serialized = UserSerializer(user)
        # send user data to group including new thumbnail
        self.send_group(self.username, 'thumbnail', serialized.data)


    

    # ------------------------------------------
    #   catch/all broadcast to client helper
    # ------------------------------------------
    def send_group(self, group, source, data):
        response ={
            'type': 'bradcast_group',
            'source': source,
            'data': data
        }
        async_to_sync(self.channel_layer.group_send)(
            group, response
        )
    
    def bradcast_group(self, data):
        '''
        data:
            - type: 'bradcast_group'
            - source: where is originated from 
            - data: whatever we want to send as dict
        '''
        data.pop('type')
        '''
        return data:
            - source: where is originated from 
            - data: whatever we want to send as dict
        '''

        self.send(text_data=json.dumps(data))