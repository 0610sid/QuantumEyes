import torch
from PIL import Image
from flask import Flask, request, jsonify
import io
from flask_cors import CORS
import qiskit
import torch
import torch.nn as nn
import numpy as np

import torch
from torch.autograd import Function
from torchvision import transforms
import torch.nn as nn

import qiskit
from qiskit.visualization import *
from classes import Hybrid , ConvNet , HybridFunction , QuantumCircuit
import __main__

setattr(__main__, "Net", ConvNet)

if torch.cuda.is_available():
    device = torch.device("cuda")
else:
    device = torch.device("cpu")

QC_outputs = ['000', '001', '010', '011', '100', '101', '110', '111']

model = torch.load('qcnnmodel_73perc.pt', map_location = torch.device('cpu'))

def transform_image(image):
    # Calculate the cropping box to make the image square
    preprocess = transforms.Compose([
        transforms.Resize(224),
        transforms.CenterCrop(224),
        transforms.ToTensor(),
    ])

    input_tensor = preprocess(image)
    input_image = input_tensor[:3, :, :]
    input_image.resize(1, 3, 224, 224)
    return input_image


def predict(input):
    model.eval()
    prediction, theta = model(input.to('cuda'))

    _, predicted = torch.max(prediction.data, 1)
    return predicted.item()


app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"])


@app.route('/predict', methods=['GET', 'POST'])
def index():
    if request.method == "POST":
        file = request.files['file']
        if file is None or file.filename == "":
            return jsonify({'error': 'No file Uploaded'})

        try:
            image_bytes = file.read()
            pillow_image = Image.open(io.BytesIO(image_bytes)).convert('RGB')
            return jsonify({'class_id': predict(transform_image(pillow_image))})

        except Exception as e:
            return jsonify({'error': str(e)})

    return "OK"


if __name__ == '__main__':
    app.run(debug=False)
