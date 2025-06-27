from rest_framework import serializers
from . models import User, Device, DeviceData



class SignUpSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'username',
            'first_name',
            'last_name',
            'email',
            'password',
        ]
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        # create all value and lowercase
        username = validated_data['username'].lower()
        first_name = validated_data['first_name'].lower()
        last_name = validated_data['last_name'].lower()
        email = validated_data['email'].lower()

        # create new user
        user = User.objects.create(
            username = username,
            first_name = first_name,
            last_name = last_name,
            email = email,
        )
        # password = validated_data['password']
        # password = validated_data['password']
        # user.set_password(validated_data['password'])
        print("Plain password:", validated_data['password'])
        user.set_password(validated_data['password'])
        print("Hashed password:", user.password)  # This should show the hashed password
        user.save()

        return user


class UserSerializer(serializers.ModelSerializer):
    
    name = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = [
            'username',
            'name',
            'email',
            'thumbnail'
        ]
    
    def get_name(self, obj):
        fname = obj.first_name.capitalize()
        lname = obj.last_name.capitalize()
        return fname + ' ' + lname
    

class DeviceDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = DeviceData
        fields = ['data_type', 'value', 'timestamp']

        
class DeviceSerializer(serializers.ModelSerializer):
    data = DeviceDataSerializer(many=True, read_only=True)

    class Meta:
        model = Device
        fields = [
            'device_id',
            'device_name',
            'location',
            'status',
            'switch',
            'limit',
            'last_active',
            'created_at',
            'data'
        ]