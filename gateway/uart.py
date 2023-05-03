import serial.tools.list_ports
import json
import time

def getPort():
    ports = serial.tools.list_ports.comports()
    N = len(ports)
    commPort = "None"
    for i in range(0, N):
        port = ports[i]
        strPort = str(port)
        if "USB-SERIAL CH340" in strPort:
            splitPort = strPort.split(" ")
            commPort = (splitPort[0])
    
    # return commPort
    return "COM6"
    
if getPort() != "None":
    ser = serial.Serial(port= getPort(), baudrate= 115200)
    print(ser)

temp = -1
humi = -1
light = -1
noise = -1

def processData(data, client):
    global temp
    global humi
    global light
    global noise
    
    data = data.replace("!", "")
    data = data.replace("#", "")
    splitData = data.split(",")
    
    print(splitData)
    for i in range(0, len(splitData)):
        splitStr = splitData[i].split(":")
        
        if splitStr[0] == "TEMP":
            if temp != splitStr[1]:
                temp = splitStr[1]
                client.publish("pasic-smart-office.temperature", temp)

        elif splitStr[0] == "HUMI":
            if humi != splitStr[1]:
                humi = splitStr[1]
                client.publish("pasic-smart-office.humidity", humi)
            
        elif splitStr[0] == "LIGHT":
            if light != splitStr[1]:
                light = splitStr[1]
                client.publish("pasic-smart-office.brightness", light)
            
        elif splitStr[0] == "NOISE":
            if noise != splitStr[1]:
                noise = splitStr[1]
                client.publish("pasic-smart-office.noise", noise)
            
        elif splitStr[0] == "D1":
            client.publish("pasic-smart-office.offices-light", splitStr[1] == "ON" and 1 or 0)
            
        elif splitStr[0] == "D2":
            client.publish("pasic-smart-office.hallways-light", splitStr[1] == "ON" and 1 or 0)
            
        elif splitStr[0] == "FAN":
            client.publish("pasic-smart-office.fan", splitStr[1])

         
mess = ""
def readSerial(client):
    bytesToRead = ser.inWaiting()
    if (bytesToRead > 0):
        global mess
        mess = mess + ser.read(bytesToRead).decode("UTF-8")
        while ("#" in mess) and ("!" in mess):
            start = mess.find("!")
            end = mess.find("#")
            processData(mess[start:end + 1], client)
            if (end == len(mess)):
                mess = ""
            else:
                mess = mess[end+1:]

def writeData(data):
    ser.write(str(data).encode())