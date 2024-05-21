<script setup lang="ts">
import { ref, reactive, onMounted, nextTick } from "vue";
import * as faceapi from "face-api.js";
import { useRoute } from "vue-router";

const imageUrls = ref([]);
const identifications = ref([]);
const croppedImagesDataUrls = ref([]);
const canvasRefs = reactive({});

const processImage = async (image, index) => {
  await nextTick(); // Ensure DOM updates have been processed
  let canvas = canvasRefs[index];
  if (!canvas) {
    console.error("Canvas not available for processing.");
    return;
  }

  canvas.width = image.naturalWidth;
  canvas.height = image.naturalHeight;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(image, 0, 0, image.naturalWidth, image.naturalHeight);

  try {
    const displaySize = { width: image.naturalWidth, height: image.naturalHeight };
    faceapi.matchDimensions(canvas, displaySize);
    const detections = await faceapi.detectAllFaces(image, new faceapi.SsdMobilenetv1Options())
      .withFaceLandmarks()
      .withFaceDescriptors();
    const resizedDetections = faceapi.resizeResults(detections, displaySize);
    faceapi.draw.drawDetections(canvas, resizedDetections);
    faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
    // Assuming updateIdentifications function is implemented to handle detections
  } catch (error) {
    console.error("Failed to detect faces:", error);
  }
};

const loadImageAndProcess = (dataUrl, index) => {
  const img = new Image();
  img.onload = () => processImage(img, index);
  img.onerror = () => console.error("Error loading image:", dataUrl);
  img.src = dataUrl;
};

onMounted(async () => {
  const route = useRoute();
  await faceapi.nets.ssdMobilenetv1.loadFromUri("/models");
  await faceapi.nets.faceLandmark68Net.loadFromUri("/models");
  await faceapi.nets.faceRecognitionNet.loadFromUri("/models");

  if (route.query.imageUrls) {
    imageUrls.value = route.query.imageUrls;
    imageUrls.value.forEach((url, index) => {
      nextTick(() => loadImageAndProcess(url, index));
    });
  }
});

const setCanvasRef = (index) => (el) => {
  if (el) {
    canvasRefs[index] = el;
  }
};
</script>


<template>
  <v-container fluid>
    <v-row>
      <v-col v-for="(imageUrl, index) in imageUrls" :key="`image-${index}`" cols="12" md="6">
        <div style="position: relative; width: 100%; margin-top: 20px;">
          <img :src="imageUrl" alt="Uploaded Image" style="width: 100%; height: auto;">
          <canvas :ref="setCanvasRef(index)" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></canvas>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
