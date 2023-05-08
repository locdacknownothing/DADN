print("Hello Adafruit!!!")
import sys
import random
import time
import serial.tools.list_ports
from Adafruit_IO import MQTTClient
from uart import *
import cv2

AIO_FEED_ID = ["pasic-smart-office.offices-light", "pasic-smart-office.hallways-light", "pasic-smart-office.fan"]
AIO_USERNAME = "Vyvy0812"
AIO_KEY = "aio_qEMb76O0TZ9UArfQsG4ejkCpr0O4"



def connected(client):
    print("Ket noi thanh cong...")
    for feed in AIO_FEED_ID:
        client.subscribe(feed)
    
def subscribe(client, userdata, mid, granted_qos):
    print("Subscribe thanh cong...")
    
def disconnected(client):
    print("Ngat ket noi...")
    sys.exit(1)
    
def message(client, feed_id, payload):
    print("Nhan du lieu " + feed_id + ": " + payload)
    print(type(payload))
    if feed_id == "pasic-smart-office.offices-light":
        if payload == "1":
            writeData("A")
        elif payload == "0":
            writeData("B")
    elif feed_id == "pasic-smart-office.hallways-light":
        if payload == "1":
            writeData("C")
        elif payload == "0":
            writeData("D")
    elif feed_id == "pasic-smart-office.fan":
        if payload == "0":
            writeData("0")
        elif payload == "25":
            writeData("1")
        elif payload == "50":
            writeData("2")
        elif payload == "75":
            writeData("3")
        elif payload == "100":
            writeData("4")

client = MQTTClient(AIO_USERNAME, AIO_KEY)
client.on_connect = connected
client.on_disconnect = disconnected
client.on_message = message
client.on_subscribe = subscribe
client.connect()
client.loop_background()

while True:
    
    # temp = random.randint(0, 50)
    # print("Cap nhat nhiet do: ", temp)
    # client.publish("pasic-smart-office.temperature", temp)
    
    readSerial(client)
    
    time.sleep(1)