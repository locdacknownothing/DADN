import speech_recognition as sr

key_words = ["ứng dụng", "điều khiển"]

def check(key_words, text):
    for word in key_words:
        if word in text: 
            return True
    return False

def callback(recognizer, audio):
    global mic, stop
    
    try:
        text = recognizer.recognize_google(audio, language="vi-VN").lower()
        if (check(key_words, text)):
            print("You call me")
            print("Muốn làm gì?")
            new_audio = recognizer.listen(mic, phrase_time_limit=5)
            # print(new_audio)
            try:
                new_text = recognizer.rerecognize_google(new_audio, language="vi-VN").lower()
                print(new_text)
            except sr.RequestError as e:
                print(e)
            except sr.UnknownValueError:
                print("error")
    except:
        pass

r = sr.Recognizer()
# mic = sr.Microphone()



# with mic as source:
#     r.adjust_for_ambient_noise(source)
# stop = r.listen_in_background(mic, callback)

def sendData2Ada(a, b):
    print("OKE")

def execute_command(text):
    print("You speak: {}".format(text))
    # text = text.split()
    if "bật" in text or "mở" in text:
        print("OK")
        if "đèn" in text:
            # Code to turn on the light
            if "hành lang" in text:  
                sendData2Ada("D2", "ON")
                print("Đã bật đèn hành lang")
            elif "văn phòng" in text:
                sendData2Ada("D1", "ON")
                print("Đã bật đèn văn phòng")
            else:
                sendData2Ada("D1", "ON")
                print("Đã bật đèn văn phòng")
        elif "quạt" in text:
            # Code to turn on the fan
            # If the fan is already running -> Do nothing
            # Else -> Run the fan with the lowest value
            # data = aio.receive(fan_url)
            # fan_speed = data.value
            if fan_speed != "0": 
                print("Quạt đã bật sẵn")
                pass
            else:
                sendData2Ada("FAN",25)
                print("Đã bật quạt")
    elif "tắt" in text:
        print("OK")
        if "đèn" in text:
            # Code to turn on the light
            first_id = text.index("đèn")
            if "hành lang" in text:
                sendData2Ada("D2", "OFF")  
                print("Đã tắt đèn hành lang")
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
                pass
            # Get the current level of the fan -> increase it
            else:
                # data = aio.receive(fan_url)
                # fan_speed = int(data.value)
                if fan_speed < 100:
                    fan_speed += 25
                    sendData2Ada("FAN", fan_speed)
                    print("Đã tăng mức quạt")
                else:
                    print("Quạt đang bật ở mức cao nhất")
            
    elif "giảm" in text:
        if "quạt" in text:
            if "thấp nhất" in text:
                sendData2Ada("FAN", 25)
                print("Đã giảm quạt xuống mức thấp nhất")
                pass
            else:
                # data = aio.receive(fan_url)
                # fan_speed = int(data.value)
                if fan_speed > 0:
                    fan_speed -= 25
                    sendData2Ada("FAN", fan_speed)
                    print("Đã giảm mức quạt")
                else:
                    print("Quạt đang tắt")


with sr.Microphone() as mic:
    while True:
        try:
            audio = r.listen(mic, 1) # This will listening until meet else
        except sr.WaitTimeoutError:  # listening timed out, just try again
            pass
        else:
            try:
                hotword_text = r.recognize_google(audio, language="vi-VN").lower()

                if (check(key_words, hotword_text)):
                    print("Bạn muốn điều khiển thiết bị nào?")
                    give_command = True
                    while give_command:
                        try:
                            voice_command = r.listen(mic, 1)
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
            except:
                pass


# stop(wait_for_stop=True)