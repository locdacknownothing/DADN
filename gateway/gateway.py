print("Hello Adafruit!!!")
import sys
import random
import time
import serial.tools.list_ports
from Adafruit_IO import MQTTClient
from uart import *
import cv2

with open("../assets/ada_key.txt", "r") as f:
    MY_KEY = f.read()
    f.close()


AIO_FEED_ID = ["pasic-smart-office.offices-light", "pasic-smart-office.hallways-light", "pasic-smart-office.fan"]
AIO_USERNAME = "Vyvy0812"



def connected(client):
    try:
        print("Đã kết nối thành công!!...")
        for feed in AIO_FEED_ID:
            client.subscribe(feed)
    except:
        print("Kết nối thất bại!!...")
        
def subscribe(client, userdata, mid, granted_qos):
    print("Đăng ký thành công!!...")
    
def disconnected(client):
    print("Ngắt kết nối...")
    sys.exit(1)
    
def message(client, feed_id, payload):
    print("Nhận dữ liệu + feed_id + ": " + payload)
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

client = MQTTClient(AIO_USERNAME, MY_KEY)
client.on_connect = connected
client.on_disconnect = disconnected
client.on_message = message
client.on_subscribe = subscribe
client.connect()
client.loop_background()

counter = 5
type_data = 0

while True:
    
    if counter <= 0:
        counter = 5
        if type_data == 0:
            temp = random.randint(0, 50)
            print("Cập nhật nhiet do: ", temp)
            client.publish("pasic-smart-office.temperature", temp)
            type_data = 1
        elif type_data == 1:
            humi = random.randint(0, 100)
            print("Cập nhật do am: ", humi)
            client.publish("pasic-smart-office.humidity", humi)
            type_data = 2
            
        elif type_data == 2:
            bright = random.randint(0, 100)
            print("Cập nhật anh sang: ", bright)
            client.publish("pasic-smart-office.brightness", bright)
            type_data = 3
            
        elif type_data == 3:
            noise = random.randint(0, 100)
            print("Cập nhật am thanh: ", noise)
            client.publish("pasic-smart-office.noise", noise)
            type_data = 0
        
            
    counter = counter - 1
    # readSerial(client)
    
    time.sleep(1)