from django.db import models

from django.contrib.auth.models import AbstractUser


# Create your models here.
def upload_thumbnail(instance, filename):
    path = f'thumbnail/{instance.username}'
    extension = filename.split('.')[-1]

    if extension:
        path = path + "." + extension
        return path

class User(AbstractUser):


    thumbnail = models.ImageField(
        upload_to=upload_thumbnail,
        null=True,
        blank=True
        )


class Device(models.Model):
    class Status(models.TextChoices):
        ACTIVE = 'active', 'Active'
        INACTIVE = 'inactive', 'Inactive'
        ABORT = 'abort', 'Abort'
        
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='devices')
    device_id = models.CharField(max_length=100, unique=True)
    device_name = models.CharField(max_length=100)
    location = models.CharField(max_length=100)
    status = models.CharField(max_length=10, choices=Status.choices, default=Status.ACTIVE)
    switch = models.BooleanField(default=False)
    limit = models.FloatField(default=30.0)  # Example: Usage limit
    last_active = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.device_name} ({self.device_id}) - {self.status}'


class DeviceData(models.Model):
    device = models.ForeignKey(Device, on_delete=models.CASCADE, related_name='data')
    data_type = models.CharField(max_length=100)  # Example: Temperature, Usage
    value = models.FloatField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.device.device_name} - {self.data_type}: {self.value}"
