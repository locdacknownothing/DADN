print("Hello Adafruit!!!")
import sys
import random
import time
import serial.tools.list_ports
from Adafruit_IO import MQTTClient, Client
# from uart import *
import cv2
import speech_recognition as sr

with open("../assets/ada_key.txt", "r") as f:
    MY_KEY = f.read()
    f.close()

AIO_USERNAME = "Vyvy0812"
aio = Client(AIO_USERNAME, MY_KEY)

office_light_url = "pasic-smart-office.offices-light"
hallways_light_url = "pasic-smart-office.hallways-light"
fan_url = "pasic-smart-office.fan"

r = sr.Recognizer()
user_input = "1"

def sendData2Ada(deviceID, value):
    if deviceID == "D1":
        aio.send_data(office_light_url, value == "ON" and 1 or 0)
    elif deviceID == "D2":
        aio.send_data(hallways_light_url, value == "ON" and 1 or 0)
    elif deviceID == "FAN":
        aio.send_data(fan_url, value)

while user_input != "2":
    print("1: Voice command\n2: Exit")
    user_input = input()
    if user_input == "1":
        with sr.Microphone() as source:
            print("Speak Anything :")
            audio = r.listen(source, phrase_time_limit=5)
            try:
                text = r.recognize_google(audio, language="vi-VN").lower()
                print("You speak: {}".format(text))
                lst_text = text.split()
                if "bật" in lst_text or "mở" in lst_text:
                    if "đèn" in lst_text:
                        # Code to turn on the light
                        first_id = lst_text.index("đèn")
                        if len(lst_text) == first_id + 1:
                            sendData2Ada("D1", "ON")
                            print("Đã bật đèn văn phòng")
                        elif lst_text[first_id + 1] == "hành" and lst_text[first_id + 2] == "lang":  
                            sendData2Ada("D2", "ON")
                            print("Đã bật đèn hành lang")
                        elif lst_text[first_id + 1] == "văn" and lst_text[first_id + 2] == "phòng":
                            sendData2Ada("D1", "ON")
                            print("Đã bật đèn văn phòng")
                    elif "quạt" in lst_text:
                        # Code to turn on the fan
                        # If the fan is already running -> Do nothing
                        # Else -> Run the fan with the lowest value
                        data = aio.receive(fan_url)
                        fan_speed = data.value
                        if fan_speed != "0": 
                            print("Quạt đã bật sẵn")
                            pass
                        else:
                            sendData2Ada("FAN",25)
                            print("Đã bật quạt")
                elif "tắt" in lst_text or "Tắt" in lst_text:
                    print("OK")
                    if "đèn" in lst_text:
                        # Code to turn on the light
                        first_id = lst_text.index("đèn")
                        if len(lst_text) == first_id + 1:
                            sendData2Ada("D1", "OFF")
                            print("Đã tắt đèn văn phòng")
                        elif lst_text[first_id + 1] == "hành" and lst_text[first_id + 2] == "lang":
                            sendData2Ada("D2", "OFF")  
                            print("Đã tắt đèn hành lang")
                        elif lst_text[first_id + 1] == "văn" and lst_text[first_id + 2] == "phòng":
                            sendData2Ada("D1", "OFF")
                            print("Đã tắt đèn văn phòng")
                    elif "quạt" in lst_text:
                        # Code to turn on the fan
                        # Always -> Put the level of fan -> 0
                        sendData2Ada("FAN", 0)
                        print("Đã tắt quạt")
                elif "tăng" in lst_text:
                    first_id = lst_text.index("tăng")
                    if lst_text[first_id + 2] == "quạt":
                        if "cao" in lst_text and "nhất" in lst_text:
                            sendData2Ada("FAN", 100)
                            print("Đã tăng quạt lên mức cao nhất")
                            continue
                        # Get the current level of the fan -> increase it
                        data = aio.receive(fan_url)
                        fan_speed = int(data.value)
                        if fan_speed < 100:
                            fan_speed += 25
                            sendData2Ada("FAN", fan_speed)
                            print("Đã tăng mức quạt")
                        else:
                            print("Quạt đang bật ở mức cao nhất")
                        
                elif "giảm" in lst_text:
                    first_id = lst_text.index("giảm")
                    if lst_text[first_id + 2] == "quạt":
                        if "thấp" in lst_text and "nhất" in lst_text:
                            sendData2Ada("FAN", 25)
                            print("Đã giảm quạt xuống mức thấp nhất")
                            continue
                        data = aio.receive(fan_url)
                        fan_speed = int(data.value)
                        if fan_speed > 0:
                            fan_speed -= 25
                            sendData2Ada("FAN", fan_speed)
                            print("Đã giảm mức quạt")
                        else:
                            print("Quạt đang tắt")
            except:
                print("Sorry could not recognize what you said")
    else: 
        pass