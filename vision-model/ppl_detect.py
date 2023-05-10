import cv2
from datetime import datetime
NO_PPL_MARK = datetime.now().timestamp()
LIGHT_OFF = False
# Initializing the HOG person
# detector
hog = cv2.HOGDescriptor()
hog.setSVMDetector(cv2.HOGDescriptor_getDefaultPeopleDetector())

cap = cv2.VideoCapture(0)
cap.set(3, 640)  # set Width
cap.set(4, 480)  # set Height

while cap.isOpened():
    if LIGHT_OFF:
        if input() == 'on': # get from adafruit
            LIGHT_OFF = False
            NO_PPL_MARK = datetime.now().timestamp()
        else:
            continue

    # Reading the video stream
    ret, image = cap.read()
    # image = imutils.resize(image,
    #                        width=min(400, image.shape[1]))

    # Detecting all the regions
    # in the Image that has a
    # pedestrians inside it
    (regions, _) = hog.detectMultiScale(image,
                                        winStride=(4, 4),
                                        padding=(4, 4),
                                        scale=1.05)

    # Drawing the regions, // to-be-deleted
    for (x, y, w, h) in regions:
        cv2.rectangle(image, (x, y),
                      (x + w, y + h),
                      (0, 0, 255), 2)

    if len(regions) > 0:
        NO_PPL_MARK = datetime.now().timestamp()
    elif datetime.now().timestamp() - NO_PPL_MARK > 10:  # 15 minutes
        print('Light-off')
        LIGHT_OFF = True

    cv2.imshow("Pasic - Camera", image)
    if cv2.waitKey(30) & 0xff == 27:
        break

cap.release()
cv2.destroyAllWindows()
