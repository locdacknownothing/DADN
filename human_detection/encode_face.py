import os
import glob
import numpy as np
from config import *

if os.path.exists(ENCODED_FACE_PATH):
    encoded_faces = np.load(f'{ENCODED_FACE_PATH}/encoded_faces.npy')
    with open(f'{ENCODED_FACE_PATH}/identities.txt') as f:
        identities = [s.strip() for s in f.readlines()]

else:
    os.makedirs(ENCODED_FACE_PATH)
    figs = glob.glob(os.path.join(DATA_PATH, "*.jpg"))
    encoded_faces = np.zeros(shape=(len(figs), 128))
    identities = []

    # Encode face
    for i, f in enumerate(figs):
        print("Encode: {}".format(f))
        img = dlib.load_rgb_image(f)
        dets = detector(img, 1)
        # Now process each face we found.
        for d in dets:
            shape = sp(img, d)
            face_chip = dlib.get_face_chip(img, shape)
            encoded_face = facerec.compute_face_descriptor(face_chip)
            encoded_faces[i, :] = encoded_face
            identities.append(os.path.split(f)[-1][:-4])

    with open(f'{ENCODED_FACE_PATH}/encoded_faces.npy', 'wb') as f:
        np.save(f, encoded_faces)

    with open(f'{ENCODED_FACE_PATH}/identities.txt', 'w') as f:
        f.write('\n'.join(identities))
