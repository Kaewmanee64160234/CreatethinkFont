<template>
  <div>
    <div id="navbar"></div>
    <div class="center-content page-container">
      <div class="progress" id="loader">
        <div class="indeterminate"></div>
      </div>
      <div style="position: relative" class="margin">
        <img id="inputImg" :src="imageUrl" style="max-width: 800px;" />
        <canvas id="overlay" />
      </div>
      <div class="row side-by-side">
        <div id="selectList"></div>
        <div class="row">
          <label for="imgUrlInput">Get image from URL:</label>
          <input v-model="imageUrl" id="imgUrlInput" type="text" class="bold" />
        </div>
        <button @click="loadImageFromUrl" class="waves-effect waves-light btn">Ok</button>
        <input id="queryImgUploadInput" type="file" class="waves-effect btn bold" @change="loadImageFromUpload" accept=".jpg, .jpeg, .png">
      </div>
      <div class="row side-by-side">
        <div id="face_detector_selection_control" class="row input-field" style="margin-right: 20px;">
          <select v-model="selectedFaceDetector" id="selectFaceDetector">
            <option value="ssd_mobilenetv1">SSD Mobilenet V1</option>
            <option value="tiny_face_detector">Tiny Face Detector</option>
          </select>
          <label>Select Face Detector</label>
        </div>
      </div>
      <span v-if="selectedFaceDetector === 'ssd_mobilenetv1'" id="ssd_mobilenetv1_controls">
        <div class="row side-by-side">
          <div class="row">
            <label for="minConfidence">Min Confidence:</label>
            <input disabled value="0.5" id="minConfidence" type="text" class="bold">
          </div>
          <button class="waves-effect waves-light btn" @click="onDecreaseMinConfidence">
            <i class="material-icons left">-</i>
          </button>
          <button class="waves-effect waves-light btn" @click="onIncreaseMinConfidence">
            <i class="material-icons left">+</i>
          </button>
        </div>
      </span>
      <span v-if="selectedFaceDetector === 'tiny_face_detector'" id="tiny_face_detector_controls">
        <div class="row side-by-side">
          <div class="row input-field" style="margin-right: 20px;">
            <select id="inputSize" v-model="selectedInputSize">
              <option value="" disabled selected>Input Size:</option>
              <option value="160">160 x 160</option>
              <option value="224">224 x 224</option>
              <option value="320">320 x 320</option>
              <option value="416">416 x 416</option>
              <option value="512">512 x 512</option>
              <option value="608">608 x 608</option>
            </select>
            <label>Input Size</label>
          </div>
          <div class="row">
            <label for="scoreThreshold">Score Threshold:</label>
            <input disabled value="0.5" id="scoreThreshold" type="text" class="bold">
          </div>
          <button class="waves-effect waves-light btn" @click="onDecreaseScoreThreshold">
            <i class="material-icons left">-</i>
          </button>
          <button class="waves-effect waves-light btn" @click="onIncreaseScoreThreshold">
            <i class="material-icons left">+</i>
          </button>
        </div>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// Define reactive variables
let imageUrl = ref('');
let error = ref(null);
const selectedFaceDetector = ref(null);
const selectedInputSize = ref(null);
const scoreThreshold = ref(0.5);
// Function to load image from URL
async function loadImageFromUrl() {
  try {
    // Make sure the URL is not empty
    if (!imageUrl.value) {
      throw new Error('Image URL is empty');
    }

    // Perform any necessary checks or preprocessing here

    // Load the image
    // Replace 'fetch' with the appropriate method to load the image
    const response = await fetch(imageUrl.value);
    if (!response.ok) {
      throw new Error('Failed to load image: ' + response.status);
    }
    
    // If everything is successful, update the image
    // You need to replace 'inputImg' with the appropriate method to update the image
    // Example: inputImg.value = ...;
  } catch (err) {
    // Handle errors
    error.value = err.message;
  }
}
const onIncreaseScoreThreshold = () => {
  try {
    // Perform any necessary validation or checks here
    
    // Increment the score threshold by a certain amount
    // For example, you can increment by 0.1
    const incrementAmount = 0.1;
    const currentScoreThreshold = parseFloat(scoreThreshold.value);
    const newScoreThreshold = currentScoreThreshold + incrementAmount;

    // Update the score threshold value
    scoreThreshold.value = newScoreThreshold.toFixed(1); // Round to one decimal place
  } catch (error) {
    // Handle any errors that may occur
    console.error('Error increasing score threshold:', error);
  }
};

const onDecreaseScoreThreshold = () => {
  try {
    // Perform any necessary validation or checks here
    
    // Decrement the score threshold by a certain amount
    // For example, you can decrement by 0.1
    const decrementAmount = 0.1;
    const currentScoreThreshold = parseFloat(scoreThreshold.value);
    const newScoreThreshold = currentScoreThreshold - decrementAmount;

    // Ensure the new score threshold is within the valid range
    const minScoreThreshold = 0; // Define the minimum score threshold allowed
    if (newScoreThreshold < minScoreThreshold) {
      throw new Error('Score threshold cannot be negative');
    }

    // Update the score threshold value
    scoreThreshold.value = newScoreThreshold.toFixed(1); // Round to one decimal place
  } catch (error) {
    // Handle any errors that may occur
    console.error('Error decreasing score threshold:', error);
  }
};

const loadImageFromUpload = (event: Event) => {
  try {
    // Access the uploaded file from the event
    const fileInput = event.target as HTMLInputElement;
    const file = fileInput.files[0];

    // Check if a file is selected
    if (!file) {
      throw new Error('No file selected');
    }

    // Perform any necessary validation or checks here

    // Create a FileReader object to read the uploaded file
    const reader = new FileReader();

    // Define the onload event handler for when the file is read successfully
    reader.onload = () => {
      // Set the image URL to the data URL of the uploaded file
      imageUrl.value = reader.result as string;
    };

    // Read the uploaded file as a data URL
    reader.readAsDataURL(file);
  } catch (error) {
    // Handle any errors that may occur
    console.error('Error loading image from upload:', error);
  }
};

// Other functions and logic go here
</script>

<style scoped>
/* Your CSS styles here */
</style>