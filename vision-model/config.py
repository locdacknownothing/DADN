import dlib

SERVER_URL = '172.20.10.4'
MODEL_PATH = 'model'
FACE_LANDMARK_MODEL = f'{MODEL_PATH}/shape_predictor_5_face_landmarks.dat'
FACE_REC_MODEL = f'{MODEL_PATH}/dlib_face_recognition_resnet_model_v1.dat'

# Load all the models we need: a detector to find the faces, a shape predictor
# to find face landmarks so we can precisely localize the face, and finally the
# face recognition model.
detector = dlib.get_frontal_face_detector()
sp = dlib.shape_predictor(FACE_LANDMARK_MODEL)
facerec = dlib.face_recognition_model_v1(FACE_REC_MODEL)
