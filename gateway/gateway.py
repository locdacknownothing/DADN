print("Hello Adafruit!!!")
import sys
import random
import time
import serial.tools.list_ports
from Adafruit_IO import MQTTClient, Client
from uart import *
import cv2

MY_KEY = "aio_bFuC23jDvDASKpSRok0gXmfk7kDj"
AIO_FEED_ID = ["pasic-smart-office.offices-light", "pasic-smart-office.hallways-light", "pasic-smart-office.fan"]
AIO_USERNAME = "Vyvy0812"

def connected(client):
    try:
        print("Đã kết nối thành công!!...")
        for feed in AIO_FEED_ID:
            print("Lắng nghe thay đổi từ... {0}".format(feed))
            client.subscribe(feed)
    except:
        print("Kết nối thất bại!!...")
        
def subscribe(client, userdata, mid, granted_qos):
    print("Đăng ký với QoS {0} thành công!!...".format(granted_qos[0]))
    
def disconnected(client):
    print("Ngắt kết nối...")
    sys.exit(1)
    
def message(client, feed_id, payload):
    print("Nhận dữ liệu " + feed_id + ": " + payload)
    sendSerial(feed_id, payload)

client = MQTTClient(AIO_USERNAME, MY_KEY)
client.on_connect = connected
client.on_disconnect = disconnected
client.on_message = message
client.on_subscribe = subscribe
client.connect()
client.loop_background()

aio = Client(AIO_USERNAME, MY_KEY)

first = 1
while True:
    if first == 1:
        sendSerialInitial(AIO_FEED_ID, aio)
        first = 0
    else:
        readSerial(client)

    time.sleep(1)


    # if counter <= 0:
    #     counter = 5
    #     # message_id = int(time.time())
    #     if type_data == 0:
    #         temp = random.randint(0, 50)
    #         print("Cập nhật nhiet do: ", temp)
    #         client.publish("pasic-smart-office.temperature", temp)
    #         type_data = 1
    #     elif type_data == 1:
    #         humi = random.randint(0, 100)
    #         print("Cập nhật do am: ", humi)
    #         client.publish("pasic-smart-office.humidity", humi)
    #         type_data = 2
            
    #     elif type_data == 2:
    #         bright = random.randint(0, 100)
    #         print("Cập nhật anh sang: ", bright)
    #         client.publish("pasic-smart-office.brightness", bright)
    #         type_data = 3
            
    #     elif type_data == 3:
    #         noise = random.randint(0, 100)
    #         print("Cập nhật am thanh: ", noise)
    #         client.publish("pasic-smart-office.noise", noise)
    #         type_data = 0
        
            
    # counter = counter - 1

counter = 5
type_data = 0


# while True:
#     try:
#         # client.publish(feed_id, message)
#         # print('Published message: {}'.format(message))
#         temp = random.randint(0, 50)
#         print("Cập nhật nhiet do: ", temp)
#         client.publish("pasic-smart-office.temperature", temp)
#     except:
#         print('Error publishing message. Retrying in 5 seconds...')
#         time.sleep(5)
#         continue
#     time.sleep(1)