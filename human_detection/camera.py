import numpy as np
import cv2
import dlib
from config import facerec, detector, sp
from encode_face import encoded_faces, identities
from timesheet import check


def convert_and_trim_bb(image, rect):
    # extract the starting and ending (x, y)-coordinates of the
    # bounding box
    startX = rect.left()
    startY = rect.top()
    endX = rect.right()
    endY = rect.bottom()
    # ensure the bounding box coordinates fall within the spatial
    # dimensions of the image
    startX = max(0, startX)
    startY = max(0, startY)
    endX = min(endX, image.shape[1])
    endY = min(endY, image.shape[0])
    # compute the width and height of the bounding box
    w = endX - startX
    h = endY - startY
    # return our bounding box coordinates
    return (startX, startY, w, h)


cap = cv2.VideoCapture(0)
cap.set(3, 640)  # set Width
cap.set(4, 480)  # set Height
while True:
    ret, img = cap.read()
    dets = detector(img, 1)
    # Now process each face we found.
    for d in dets:
        shape = sp(img, d)
        face_chip = dlib.get_face_chip(img, shape)
        encoded_face = np.array(facerec.compute_face_descriptor(face_chip))
        distance = np.linalg.norm(encoded_faces-encoded_face, axis=1)
        i_min = np.argmin(distance)
        if distance[i_min] <= 0.6:
            iden = identities[i_min]
            check(iden)
        else:
            iden = 'unknown'

        x, y, w, h = convert_and_trim_bb(img, d)
        cv2.rectangle(img, (x, y), (x + w, y + h), (0, 255, 0), 2)
        y = y - 10 if y - 10 > 10 else y + 10
        cv2.putText(img, iden, (x, y), cv2.FONT_HERSHEY_SIMPLEX,
                    0.45, (0, 255, 0), 2)

    cv2.imshow('Pasic - Camera', img)
    if cv2.waitKey(30) & 0xff == 27:
        break

cap.release()
cv2.destroyAllWindows()
