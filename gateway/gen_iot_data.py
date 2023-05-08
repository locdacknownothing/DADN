from Adafruit_IO import Client

with open("../assets/ada_key.txt", "r") as f:
    MY_KEY = f.read()
    f.close()

AIO_USERNAME = "Vyvy0812"
aio = Client(AIO_USERNAME, MY_KEY)

humi_key = "pasic-smart-office.humidity"
brightness_key = "pasic-smart-office.brightness"
noise_key = "pasic-smart-office.noise"
temp_key = "pasic-smart-office.temperature"

aio.send_data(humi_key, 0)