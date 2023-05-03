import os
import sqlite3
import logging
import numpy as np
from config import *

conn = sqlite3.connect('db/database.db')

if os.path.exists(ENCODED_FACE_PATH):
    encoded_faces = np.load(f'{ENCODED_FACE_PATH}/encoded_faces.npy')
else:
    os.makedirs(ENCODED_FACE_PATH)
    figs = list(conn.execute("SELECT id, img_url FROM user"))
    encoded_faces = np.zeros(shape=(len(figs), 128))

    # Encode face
    for i, f in figs:
        logging.warn("Encode: {}".format(f))
        img = dlib.load_rgb_image(f)
        dets = detector(img, 1)
        # Now process each face we found.
        for d in dets:
            shape = sp(img, d)
            face_chip = dlib.get_face_chip(img, shape)
            encoded_face = facerec.compute_face_descriptor(face_chip)
            encoded_faces[i, :] = encoded_face

    with open(f'{ENCODED_FACE_PATH}/encoded_faces.npy', 'wb') as f:
        np.save(f, encoded_faces)
