import paho.mqtt.client as mqtt

# Define the MQTT broker settings
MQTT_BROKER = 'broker.hivemq.com'  
MQTT_PORT = 1883
MQTT_KEEP_ALIVE = 60

# Create a client instance
client = mqtt.Client()

# Define the callback functions
def on_connect(client, userdata, flags, rc):
    print(f'Connected with result code {rc}')
    # Subscribe to a topic
    client.subscribe('test/topic')

def on_message(client, userdata, msg):
    print(f'Message received: {msg.topic} {msg.payload.decode()}')

# Assign the callback functions
client.on_connect = on_connect
client.on_message = on_message

# Connect to the broker
client.connect(MQTT_BROKER, MQTT_PORT, MQTT_KEEP_ALIVE)

# Start the loop to process network traffic
client.loop_start()
