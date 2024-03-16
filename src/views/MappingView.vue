<template>
  <div class="face-matching">
    <h1>Face Matching</h1>
    <div>
      <h2>Reference Image (Single Person)</h2>
      <input type="file" @change="loadReferenceImage" accept="image/*" />
      <!-- Set the image height to 45vh -->
      <img
        ref="referenceImage"
        :src="referenceImageUrl"
        alt="Reference Image"
        style="height: 45vh; display: block; width: auto; max-width: 100%"
      />
    </div>
    <div>
      <h2>Target Image (Group Photo)</h2>
      <input type="file" @change="loadTargetImage" accept="image/*" />
      <!-- Set the image height to 45vh -->
      <img
        ref="targetImage"
        :src="targetImageUrl"
        alt="Target Image"
        style="height: 45vh; display: block; width: auto; max-width: 100%"
      />
      <canvas
        ref="canvas"
        style="position: absolute; left: 0; top: 0; display: none;"
      ></canvas>
    </div>
    <button @click="matchFaces">Match Faces</button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from "vue";
import * as faceapi from "face-api.js";

// Define refs with initial types
const referenceImage = ref<HTMLImageElement | null>(null);
const targetImage = ref<HTMLImageElement | null>(null);
const canvas = ref<HTMLCanvasElement | null>(null);
const referenceImageUrl = ref<string>("");
const targetImageUrl = ref<string>("");
let referenceDescriptor: Float32Array | null = null;

// Function to initialize face-api models
const loadModels = async (): Promise<void> => {
  await faceapi.nets.ssdMobilenetv1.loadFromUri("/models");
  await faceapi.nets.faceLandmark68Net.loadFromUri("/models");
  await faceapi.nets.faceRecognitionNet.loadFromUri("/models");
  console.log("Models loaded");
};

onMounted(() => {
  loadModels();
});

// Function to handle reference image loading
const loadReferenceImage = async (event: Event): Promise<void> => {
  const target = event.target as HTMLInputElement;
  if (target.files) {
    const file = target.files[0];
    referenceImageUrl.value = URL.createObjectURL(file);
    await nextTick(); // Wait for the image element to be updated
    const loadTargetImage = async (event: Event): Promise<void> => {
      const target = event.target as HTMLInputElement;
      if (target.files) {
        const file = target.files[0];
        targetImageUrl.value = URL.createObjectURL(file);

        await nextTick();
        // Ensure the image is loaded before displaying the canvas or attempting detection
        targetImage.value!.onload = async () => {
          if (canvas.value) {
            canvas.value.style.display = "none"; // Initially hide canvas
          } else {
            alert("No faces detected in the target image.");
          }
          // Optionally, call detectFaces here if you want auto-detection
        };
      }
    };

    const detection = await faceapi
      .detectSingleFace(referenceImage.value!)
      .withFaceLandmarks()
      .withFaceDescriptor();
    if (detection) {
      referenceDescriptor = detection.descriptor;
    } else {
      alert("No faces detected in the reference image.");
    }
  }
};

// Function to handle target image loading
const loadTargetImage = (event: Event): void => {
  const target = event.target as HTMLInputElement;
  if (target.files) {
    const file = target.files[0];
    targetImageUrl.value = URL.createObjectURL(file);
    if (canvas.value) {
      canvas.value.style.display = "none"; // Hide canvas until match is found
    }
  }
};

// Function to match faces and highlight the match in the target image
const matchFaces = async (): Promise<void> => {
  if (!referenceDescriptor || !targetImage.value) {
    alert("Please load a reference and a target image first.");
    return;
  }

  const detections = await faceapi
    .detectAllFaces(targetImage.value)
    .withFaceLandmarks()
    .withFaceDescriptors();
  const faceMatcher = new faceapi.FaceMatcher([
    new faceapi.LabeledFaceDescriptors("reference", [referenceDescriptor]),
  ]);
  detections.forEach((detection) => {
    const bestMatch = faceMatcher.findBestMatch(detection.descriptor);
    if (bestMatch.label !== "unknown") {
      drawBoxAroundFace(detection);
    }
    console.log(detections);
  });
};
// Adjust this function to ensure the canvas matches the target image dimensions and position.
const adjustCanvasSize = () => {
  if (!targetImage.value || !canvas.value) return;
  const imgRect = targetImage.value.getBoundingClientRect();
  canvas.value.width = imgRect.width;
  canvas.value.height = imgRect.height;
  canvas.value.style.display = 'block';
  // Position canvas exactly over the image
  canvas.value.style.left = `${imgRect.left}px`;
  canvas.value.style.top = `${imgRect.top}px`;
};

// Utility function to draw a box around the matched face
const drawBoxAroundFace = (detection:any) => {
  if (!canvas.value) return;
  adjustCanvasSize(); // Ensure canvas size and position are adjusted
  const ctx = canvas.value.getContext('2d');
  if (ctx && detection.detection.box) {
    const { x, y, width, height } = detection.detection.box;
    ctx.strokeStyle = '#00FF00'; // Bright green color for visibility
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, width, height);
  }
};

</script>

<style></style>
