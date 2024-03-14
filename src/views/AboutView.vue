<template>
  <div class="about">
    <h1>This is an about page</h1>
    <!-- File input for selecting an image -->
    <input type="file" @change="onFileChange" accept="image/*">
    
    <!-- Button to trigger face detection -->
    <button @click="detectFaces">Detect Faces</button>
    <!-- Display the selected image -->
    <img ref="imageElement" :src="selectedImage" alt="Selected Image" style="max-width: 100%; display: block;">
    <!-- Canvas for drawing detections, placed directly over the image -->
    <canvas ref="canvas" style="position: absolute; left: 0; top: 0;"></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import * as faceapi from "face-api.js";

const selectedImage = ref("");
const imageElement = ref<HTMLImageElement | null>(null);
const canvas = ref<HTMLCanvasElement | null>(null);

// Load the models when the component mounts
onMounted(async () => {
  await faceapi.nets.ssdMobilenetv1.loadFromUri("/models");
  await faceapi.nets.faceLandmark68Net.loadFromUri("/models");
  await faceapi.nets.faceRecognitionNet.loadFromUri("/models");
  console.log("Models loaded");
});

const detectFaces = async () => {
  if (imageElement.value && canvas.value) {
    const img = imageElement.value;
    const detections = await faceapi
      .detectAllFaces(img, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceDescriptors();
    const displaySize = { width: img.width, height: img.height };
    faceapi.matchDimensions(canvas.value, displaySize);
    const resizedDetections = faceapi.resizeResults(detections, displaySize);
    const ctx = canvas.value.getContext("2d");
    if (ctx) {
      ctx.clearRect(0, 0, canvas.value.width, canvas.value.height);
      faceapi.draw.drawDetections(canvas.value, resizedDetections);
      faceapi.draw.drawFaceLandmarks(canvas.value, resizedDetections);
    }
  }
};

const onFileChange = (e: Event) => {
  const files = (e.target as HTMLInputElement).files;
  if (files && files.length > 0) {
    const file = files[0];
    selectedImage.value = URL.createObjectURL(file);
    // Clear previous detections by redrawing the canvas
    if (canvas.value) {
      const ctx = canvas.value.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.value.width, canvas.value.height);
      }
    }
  }
};
</script>
