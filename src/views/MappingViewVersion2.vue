<script setup lang="ts">
import { ref, reactive, onMounted, nextTick } from "vue";
import * as faceapi from "face-api.js";
import { useRoute } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import type { FaceDetection, WithFaceLandmarks, WithFaceDescriptor } from 'face-api.js'; // Import types
import Person from "@/stores/types/Person";
import { useAssignmentStore } from "@/stores/assignment.store";

interface CanvasRefs {
  [key: number]: HTMLCanvasElement;
}

const imageUrls = ref<string[]>([]);
const identifications = ref<{name:string,studentId:string}[]>([]);
const croppedImagesDataUrls = ref<string[]>([]);
const canvasRefs = reactive<CanvasRefs>({});
const authStore = useAuthStore();
const assigmentStore = useAssignmentStore();

const processImage = async (image: HTMLImageElement, index: number) => {
  await nextTick();
  const canvas = canvasRefs[index];
  if (!canvas || image.naturalWidth === 0 || image.naturalHeight === 0) {
    console.error("Canvas not available for processing or image size is zero.");
    return;
  }

  canvas.width = image.naturalWidth;
  canvas.height = image.naturalHeight;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    console.error("Unable to get canvas context.");
    return;
  }

  ctx.drawImage(image, 0, 0, image.naturalWidth, image.naturalHeight);

  try {
    const displaySize = { width: image.naturalWidth, height: image.naturalHeight };
    faceapi.matchDimensions(canvas, displaySize);
    const detections = await faceapi.detectAllFaces(image, new faceapi.SsdMobilenetv1Options())
      .withFaceLandmarks()
      .withFaceDescriptors() as WithFaceLandmarks<{ detection: FaceDetection }, WithFaceDescriptor>[];
    const resizedDetections = faceapi.resizeResults(detections, displaySize);
    faceapi.draw.drawDetections(canvas, resizedDetections);
    faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
    updateIdentifications(resizedDetections, image, ctx);
  } catch (error) {
    console.error("Failed to detect faces:", error);
  }
};

const loadImageAndProcess = (dataUrl: string, index: number) => {
  const img = new Image();
  img.onload = () => {
    processImage(img, index);
  };
  img.onerror = () => {
    console.error("Error loading image:", dataUrl);
  };
  img.src = dataUrl;
};

onMounted(async () => {
  const route = useRoute();
  await faceapi.nets.ssdMobilenetv1.loadFromUri("/models");
  await faceapi.nets.faceLandmark68Net.loadFromUri("/models");
  await faceapi.nets.faceRecognitionNet.loadFromUri("/models");

  const urls: string | string[] = route.query.imageUrls;
  if (Array.isArray(urls)) {
    imageUrls.value = urls;
    imageUrls.value.forEach((url, index) => {
      nextTick(() => loadImageAndProcess(url, index));
    });
  }
});

const setCanvasRef = (index: number) => (el: HTMLCanvasElement) => {
  if (el) {
    canvasRefs[index] = el;
  }
};

const updateIdentifications = (detections: WithFaceLandmarks<{ detection: FaceDetection }, WithFaceDescriptor>[], image: HTMLImageElement, ctx: CanvasRenderingContext2D) => {


  const faceMatcher = new faceapi.FaceMatcher(authStore.gallery.map(person => new faceapi.LabeledFaceDescriptors(person.name, [person.descriptor])));

  detections.forEach((detection, index) => {
    const bestMatch = faceMatcher.findBestMatch(detection.descriptor);
    let person = authStore.gallery.find(p => p.name === bestMatch.label);
    
    let personName = person ? person.name : 'Unknown';
    let personId = person ? person.idStudent : 'N/A';  


    identifications.value.push({ name: personName, studentId: personId });

    const box = detection.detection.box;
    const cropCanvas = document.createElement('canvas');
    cropCanvas.width = box.width;
    cropCanvas.height = box.height;
    const cropCtx = cropCanvas.getContext('2d');
    if (cropCtx) {
      cropCtx.drawImage(image, box.x, box.y, box.width, box.height, 0, 0, box.width, box.height);
      croppedImagesDataUrls.value.push(cropCanvas.toDataURL());
    }
  });
};

// create function confirm attendance
const confirmAttendance = async () => {
 
  for (let i = 0; i < identifications.value.length; i++){
    if(identifications.value[i].name === 'Unknown'){
      const attdent = {
      attendanceId: 0,
    attendanceDate: new Date(),
    attendanceStatus:"",
    attendanceImage: croppedImagesDataUrls.value[i],
    attendanceConfirmStatus:'not Confirm',
    assignment:assigmentStore.assignment,
    user:null
    }
    await assigmentStore.createAssignment(attdent);

    }else{
      const attdent = {
      attendanceId: 0,
    attendanceDate: new Date(),
    attendanceStatus:"",
    attendanceImage: croppedImagesDataUrls.value[i],
    attendanceConfirmStatus:'not Confirm',
    assignment:assigmentStore.assignment,
    user:authStore.gallery.find(user => user.idStudent === identifications.value[i].studentId)
    
    }
    await assigmentStore.createAttendance(attdent);
    }
  
    
  

  }
};

</script>

<template>
  <v-container style="margin-top: 5%;">
    <!-- Display Controls and Image Upload -->
  <v-row>
    <v-col cols="12" md="6">
    
    </v-col>
    <v-col cols="12" md="6">
      <v-btn @click="confirmAttendance()">Check Attendance</v-btn>
    </v-col>
  </v-row>
    <!-- Layout Row for Image Display and Identifications -->
    <v-row>
      <!-- Column for Original Images with Canvas Overlay -->
      <v-col cols="12" md="6">
        <div v-for="(imageUrl, index) in imageUrls" :key="'orig-image-' + index" style="position: relative; width: 100%; margin-bottom: 20px;">
          <img :src="imageUrl" alt="Uploaded Image" style="width: 100%; height: auto;">
          <canvas :ref="setCanvasRef(index)" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></canvas>
        </div>
      </v-col>

      <!-- Column for Identification and Cropped Images Display, 3 per row -->
      <v-col cols="12" md="6">
        <v-row>
          <v-col cols="12" sm="4" v-for="(name, index) in identifications" :key="'id-' + index">
            <v-card outlined>
              <v-card-title class="white--text">{{ name.studentId }} | {{ name.name }}</v-card-title>
              <v-img :src="croppedImagesDataUrls[index]" aspect-ratio="1.5" class="rounded-lg"></v-img>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>




<style scoped>
/* Additional style to manage overlays and positioning */
</style>
