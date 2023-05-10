from Adafruit_IO import Client
import speech_recognition as sr

## Setup for Adafruit ####################################################
with open("../assets/ada_key.txt", "r") as f:
    MY_KEY = f.read()
    f.close()

AIO_USERNAME = "Vyvy0812"
aio = Client(AIO_USERNAME, MY_KEY)

office_light_url = "pasic-smart-office.offices-light"
hallways_light_url = "pasic-smart-office.hallways-light"
fan_url = "pasic-smart-office.fan"

def sendData2Ada(deviceID, value):
    if deviceID == "D1":
        aio.send_data(office_light_url, value == "ON" and 1 or 0)
    elif deviceID == "D2":
        aio.send_data(hallways_light_url, value == "ON" and 1 or 0)
    elif deviceID == "FAN":
        aio.send_data(fan_url, value)

###########################################################################

def check(key_words, text):
    for word in key_words:
        if word in text: 
            return True
    return False

def execute_command(text):
    print("You speak: {}".format(text))
    # text = text.split()
    if "bật" in text or "mở" in text:
        print("OK")
        if "đèn" in text:
            # Code to turn on the light
            if "hành lang" in text:  
                recent_status = aio.receive(hallways_light_url)
                if int(recent_status.value) == 1:
                    print("Đèn hành lang đã được bật trước")
                else:
                    sendData2Ada("D2", "ON")
                    print("Đã bật đèn hành lang")
            else:
                recent_status = aio.receive(office_light_url)
                if int(recent_status.value) == 1:
                    print("Đèn đã văn phòng đã được bật trước")
                else:
                    sendData2Ada("D1", "ON")
                    print("Đã bật đèn văn phòng")
        elif "quạt" in text:
            # Code to turn on the fan
            # If the fan is already running -> Do nothing
            # Else -> Run the fan with the lowest value
            data = aio.receive(fan_url)
            fan_speed = data.value
            # print("Mức quạt hiện tại là: " + str(fan_speed))
            if int(fan_speed) != 0: 
                print("Quạt đã bật sẵn")
            elif "mức" in text:
                if "1" in text:
                    sendData2Ada("FAN", 25)
                    print("Đã bật quạt mức 1")
                elif "2" in text:
                    sendData2Ada("FAN", 50)
                    print("Đã bật quạt mức 2")
                elif "3" in text:
                    sendData2Ada("FAN", 75)
                    print("Đã bật quạt mức 3")
                elif "4" in text or "cao nhất" in text:
                    sendData2Ada("FAN", 100)
                    print("Đã bật quạt mức 4")
            else:
                sendData2Ada("FAN",25)
                print("Đã bật quạt")
    elif "tắt" in text:
        print("OK")
        if "đèn" in text:
            # Code to turn on the light
            if "hành lang" in text:
                recent_status = aio.receive(hallways_light_url)
                if int(recent_status.value) == 0:
                    print("Đèn hành lang đang tắt")
                else:
                    sendData2Ada("D2", "OFF")  
                    print("Đã tắt đèn hành lang")
            else:
                recent_status = aio.receive(office_light_url)
                if int(recent_status.value) == 0:
                    print("Đèn văn phòng đang tắt")
                else:
                    sendData2Ada("D1", "OFF")
                    print("Đã tắt đèn văn phòng")
        elif "quạt" in text:
            # Code to turn on the fan
            # Always -> Put the level of fan -> 0
            sendData2Ada("FAN", 0)
            print("Đã tắt quạt")
    elif "tăng" in text:
        if "quạt" in text:
            if "cao nhất" in text:
                sendData2Ada("FAN", 100)
                print("Đã tăng quạt lên mức cao nhất")
            # Get the current level of the fan -> increase it
            elif "mức" in text:
                if "1" in text:
                    sendData2Ada("FAN", 25)
                    print("Đã điều chỉnh quạt mức 1")
                elif "2" in text:
                    sendData2Ada("FAN", 50)
                    print("Đã điều chỉnh quạt mức 2")
                elif "3" in text:
                    sendData2Ada("FAN", 75)
                    print("Đã điều chỉnh quạt mức 3")
                elif "4" in text or "cao nhất" in text:
                    sendData2Ada("FAN", 100)
                    print("Đã điều chỉnh quạt mức 4")
            else:
                data = aio.receive(fan_url)
                fan_speed = int(data.value)
                if fan_speed < 100:
                    fan_speed += 25
                    sendData2Ada("FAN", fan_speed)
                    print("Đã tăng mức quạt")
                elif fan_speed == 100:
                    print("Quạt đang ở mức cao nhất, không thể điều chỉnh thêm")
                else:
                    print("Quạt đang bật ở mức cao nhất")
            
    elif "giảm" in text or "hạ" in text:
        if "quạt" in text:
            if "thấp nhất" in text:
                sendData2Ada("FAN", 25)
                print("Đã giảm quạt xuống mức thấp nhất")
            
            elif "mức" in text:
                if "1" in text:
                    sendData2Ada("FAN", 25)
                    print("Đã điều chỉnh quạt mức 1")
                elif "2" in text:
                    sendData2Ada("FAN", 50)
                    print("Đã điều chỉnh quạt mức 2")
                elif "3" in text:
                    sendData2Ada("FAN", 75)
                    print("Đã điều chỉnh quạt mức 3")
                elif "4" in text or "cao nhất" in text:
                    sendData2Ada("FAN", 100)
                    print("Đã điều chỉnh quạt mức 4")
            else:
                data = aio.receive(fan_url)
                fan_speed = int(data.value)
                if fan_speed > 0:
                    fan_speed -= 25
                    sendData2Ada("FAN", fan_speed)
                    print("Đã giảm mức quạt")
                elif fan_speed == 25:
                    print("Quạt đang ở mức thấp nhất, không thể giảm")
                else:
                    print("Quạt đang tắt")
    elif "chỉnh" in text:
        if "quạt" in text:
            if "mức" in text:
                if "1" in text:
                    sendData2Ada("FAN", 25)
                    print("Đã điều chỉnh quạt mức 1")
                elif "2" in text:
                    sendData2Ada("FAN", 50)
                    print("Đã điều chỉnh quạt mức 2")
                elif "3" in text:
                    sendData2Ada("FAN", 75)
                    print("Đã điều chỉnh quạt mức 3")
                elif "4" in text or "cao nhất" in text:
                    sendData2Ada("FAN", 100)
                    print("Đã điều chỉnh quạt mức 4")
    else:
        print("Tôi không hiểu bạn nói lại được chứ?")
    # raise "Tôi không hiểu"

key_words = ["basic", "ứng dụng", "điều khiển"]

r = sr.Recognizer()

with sr.Microphone() as source:
    while True:
        try:
            print("Listening ...")
            audio = r.listen(source, 1, phrase_time_limit=2) # This will listening until meet else
        except sr.WaitTimeoutError:  # listening timed out, just try again
            pass
        else:
            try:
                # hotword_text = r.recognize_google(audio, language="vi-VN").lower()
                hotword_text = r.recognize_vosk(audio).lower()

                if (check(key_words, hotword_text)):
                    print("Bạn muốn ra lệnh gì?")
                    give_command = True
                    while give_command:
                        try:
                            voice_command = r.listen(source, 1, phrase_time_limit=10)
                        except sr.WaitTimeoutError:
                            pass
                        else:
                            try:
                                command = r.recognize_google(voice_command, language="vi-VN").lower()
                                if "dừng lại" in command or "kết thúc" in command:
                                    give_command = False
                                else:
                                    execute_command(command)
                            except:
                                print("Xin lỗi tôi không hiểu bạn nói gì. Bạn có thể ra lệnh lại hoặc dừng lại")
                                # pass
                    print("Chào bạn! Chúc bạn một ngày tốt lành")
                else:
                    print("Not keyword")
            except:
                pass