


<script lang="ts">
import { ref } from 'vue';
import faceapi from 'face-api.js';

const imageUrl = ref('');
const selectedFaceDetector = ref('ssd_mobilenetv1');
const minConfidence = ref(0.5);
const inputSize = ref('160');
const scoreThreshold = ref(0.5);

function onDecreaseMinConfidence() {
  minConfidence.value -= 0.1;
}

function onIncreaseMinConfidence() {
  minConfidence.value += 0.1;
}

function onDecreaseScoreThreshold() {
  scoreThreshold.value -= 0.1;
}

function onIncreaseScoreThreshold() {
  scoreThreshold.value += 0.1;
}

function loadImageFromUrl() {
  // Implement your logic to load image from URL
}

function loadImageFromUpload() {
  // Implement your logic to load image from upload
}
</script>



<template>
  <div>
    <div id="navbar"></div>
    <div class="center-content page-container">
      <div class="progress" id="loader">
        <div class="indeterminate"></div>
      </div>
      <div style="position: relative" class="margin">
        <img ref="inputImg" src="imageUrl" style="max-width: 800px;" />
        <canvas ref="overlay" />
      </div>
      <div class="row side-by-side">
        <!-- image_selection_control -->
        <div id="selectList"></div>
        <div class="row">
          <label for="imgUrlInput">Get image from URL:</label>
          <input  id="imgUrlInput" type="text" class="bold" />
        </div>
        <button class="waves-effect waves-light btn" >Ok</button>
        <input id="queryImgUploadInput" type="file" class="waves-effect btn bold" 
          accept=".jpg, .jpeg, .png" />
        <!-- image_selection_control -->
      </div>
      <div class="row side-by-side">
        <!-- face_detector_selection_control -->
        <div id="face_detector_selection_control" class="row input-field" style="margin-right: 20px;">
          <select  id="selectFaceDetector">
            <option value="ssd_mobilenetv1">SSD Mobilenet V1</option>
            <option value="tiny_face_detector">Tiny Face Detector</option>
          </select>
          <label>Select Face Detector</label>
        </div>
        <!-- face_detector_selection_control -->
      </div>
      <!-- ssd_mobilenetv1_controls -->
      <!-- <span v-if="selectedFaceDetector === 'ssd_mobilenetv1'" id="ssd_mobilenetv1_controls">
        <div class="row side-by-side">
          <div class="row">
            <label for="minConfidence">Min Confidence:</label>
            <input disabled value="minConfidence" id="minConfidence" type="text" class="bold" />
          </div>
          <button class="waves-effect waves-light btn" >
            <i class="material-icons left">-</i>
          </button>
          <button class="waves-effect waves-light btn" >
            <i class="material-icons left">+</i>
          </button>
        </div>
      </span> -->
      <!-- ssd_mobilenetv1_controls -->
      <!-- tiny_face_detector_controls -->
      <!-- <span v-else id="tiny_face_detector_controls">
        <div class="row side-by-side">
          <div class="row input-field" style="margin-right: 20px;">
            <select  id="inputSize">
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
            <input disabled :value="scoreThreshold" id="scoreThreshold" type="text" class="bold" />
          </div>
          <button class="waves-effect waves-light btn" @click="onDecreaseScoreThreshold()">
            <i class="material-icons left">-</i>
          </button>
          <button class="waves-effect waves-light btn" @click="onIncreaseScoreThreshold()">
            <i class="material-icons left">+</i>
          </button>
        </div>
      </span> -->
      <!-- tiny_face_detector_controls -->
    </div>
  </div>
</template>
<style scoped>
/* Add your CSS styles here */
</style>