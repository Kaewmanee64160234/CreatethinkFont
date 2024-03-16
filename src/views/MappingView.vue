<template>
    <div style="position: relative; width: 500px; height: 500px;">
      <input
        type="file"
        @change="onFileChange"
        accept="image/*"
        style="position: relative; z-index: 2;"
      />
      <img
        :src="selectedImage"
        @load="onImageLoad"
        ref="imageElement"
        width="500"
        height="500"
        style="position: absolute; top: 0; left: 0;"
      />
      <canvas
        ref="canvas"
        width="500"
        height="500"
        style="position: absolute; top: 0; left: 0;"
      ></canvas>
    </div>
    <div v-if="descriptors.length">
      <h3>Face Descriptors:</h3>
      <pre>{{ descriptors }}</pre>
    </div>
  </template>
  
  <script setup lang="ts">
  import { onMounted, ref, reactive } from "vue";
  import * as faceapi from "face-api.js";
  
  const selectedImage = ref("");
  const imageElement = ref<HTMLImageElement | null>(null);
  const canvas = ref<HTMLCanvasElement | null>(null);
  const descriptors = reactive<{ [key: string]: any }[]>([]);
  
  onMounted(async () => {
    await loadModels();
  });
  
  const loadModels = async () => {
    await faceapi.nets.ssdMobilenetv1.loadFromUri("/models");
    await faceapi.nets.faceLandmark68Net.loadFromUri("/models");
    await faceapi.nets.faceRecognitionNet.loadFromUri("/models");
  };
  
  const onFileChange = async (event: Event) => {
    const { files } = event.target as HTMLInputElement;
    if (!files || !files.length) return;
  
    if (selectedImage.value) {
      URL.revokeObjectURL(selectedImage.value); // Clean up the previous URL
    }
  
    selectedImage.value = URL.createObjectURL(files[0]);
  };
  
  const onImageLoad = async () => {
    descriptors.splice(0); // Clear previous descriptors
  
    if (!imageElement.value || !canvas.value) return;
  
    const displaySize = {
      width: imageElement.value.width,
      height: imageElement.value.height,
    };
    faceapi.matchDimensions(canvas.value, displaySize);
  
    const detections = await faceapi
      .detectAllFaces(imageElement.value)
      .withFaceLandmarks()
      .withFaceDescriptors();
  
    const resizedDetections = faceapi.resizeResults(detections, displaySize);
    faceapi.draw.drawDetections(canvas.value, resizedDetections);
    faceapi.draw.drawFaceLandmarks(canvas.value, resizedDetections);
  
    detections.forEach((detection, index) => {
      descriptors.push({
        [`Face ${index + 1}`]: detection.descriptor,
      });
    });
  };
  </script>
  