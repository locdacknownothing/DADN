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
    
    return commPort
    return "COM11"
    
if getPort() != "None":
    ser = serial.Serial(port= getPort(), baudrate= 115200)
    print(ser)

temp = -1
humi = -1
light = -1
noise = -1
office_light = -1
hallway_light = -1
fan = -1

def processData(data, client):
    global temp
    global humi
    global light
    global noise
    global office_light
    global hallway_light
    global fan
    
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
            if office_light != (splitStr[1] == "ON" and 1 or 0): 
                office_light = (splitStr[1] == "ON" and 1 or 0)
                client.publish("pasic-smart-office.offices-light", office_light)
            
        elif splitStr[0] == "D2":
            if hallway_light != (splitStr[1] == "ON" and 1 or 0): 
                hallway_light = (splitStr[1] == "ON" and 1 or 0)
                client.publish("pasic-smart-office.hallways-light", hallway_light)
            
        elif splitStr[0] == "FAN":
            if fan != int(splitStr[1]):
                fan = int(splitStr[1])
                client.publish("pasic-smart-office.fan", fan)

         
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
    
def sendSerial(feed_id, payload):
    global office_light
    global hallway_light
    global fan
    if feed_id == "pasic-smart-office.offices-light":
        if payload == "1":
            office_light = 1
            writeData("A")
        elif payload == "0":
            office_light = 0
            writeData("B")
    elif feed_id == "pasic-smart-office.hallways-light":
        if payload == "1":
            hallway_light = 1
            writeData("C")
        elif payload == "0":
            hallway_light = 0
            writeData("D")
    elif feed_id == "pasic-smart-office.fan":
        if payload == "0":
            fan = 0
            writeData("0")
        elif payload == "25":
            fan = 25
            writeData("1")
        elif payload == "50":
            fan = 50
            writeData("2")
        elif payload == "75":
            fan = 75
            writeData("3")
        elif payload == "100":
            fan = 100
            writeData("4")
            
def sendSerialInitial(AIO_FEED_ID, aio):
    global office_light
    global hallway_light
    global fan

    bytesToRead = ser.inWaiting()
    mess = ""
    if (bytesToRead > 0):
        mess = mess + ser.read(bytesToRead).decode("UTF-8")
        while ("#" in mess) and ("!" in mess):
            start = mess.find("!")
            end = mess.find("#")
            processData(mess[start:end + 1], client)
            if (end == len(mess)):
                mess = ""
            else:
                mess = mess[end+1:]
    if (mess == "!Start#"):
        for feed_id in AIO_FEED_ID:
            data = aio.receive(feed_id)
            if feed_id == "pasic-smart-office.offices-light":
                print(feed_id + ": " + data.value)
                if data.value == "1":
                    office_light = 1
                    writeData("A")
                elif data.value == "0":
                    office_light = 0
                    writeData("B")
            elif feed_id == "pasic-smart-office.hallways-light":
                print(feed_id + ": " + data.value)
                if data.value == "1":
                    hallway_light = 1
                    writeData("C")
                elif data.value == "0":
                    hallway_light = 1
                    writeData("D")
            elif feed_id == "pasic-smart-office.fan":
                print(feed_id + ": " + data.value)
                if data.value == "0":
                    fan = 0
                    writeData("0")
                elif data.value == "25":
                    fan = 25
                    writeData("1")
                elif data.value == "50":
                    fan = 50
                    writeData("2")
                elif data.value == "75":
                    fan = 75
                    writeData("3")
                elif data.value == "100":
                    fan = 100
                    writeData("4")
