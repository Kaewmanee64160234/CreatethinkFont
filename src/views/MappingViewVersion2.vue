<script setup lang="ts">
import { ref, onMounted, nextTick, watch } from "vue";
import * as faceapi from "face-api.js";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { useFaceStore } from "@/stores/face.store";
import { useCourseStore } from "@/stores/course.store";
import { useAssignmentStore } from "@/stores/assignment.store";
import Person from "@/stores/types/Person";

const imageElement = ref<HTMLImageElement | null>(null);
const imageUrl = ref<string | null>(null);
const croppedImagesDataUrls = ref([]);
const identifications = ref<string[]>([]);
const imageCanvas = ref<HTMLCanvasElement | null>(null);
  const containerWidth = ref(0);
const authStore = useAuthStore();
const faceStore = useFaceStore();
const courseStore = useCourseStore();
const assignmentStore = useAssignmentStore();
const router = useRouter();
const route = useRoute();

watch(() => route.query.imageUrl, (newVal) => {
  imageUrl.value = typeof newVal === 'string' ? newVal : null;
}, { immediate: true });

onMounted(async () => {
  await Promise.all([
    faceapi.nets.ssdMobilenetv1.loadFromUri("/models"),
    faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
    faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
  ]);
  if (imageUrl.value) {
    loadImage();
  }
});
const loadImage = () => {
  if (imageUrl.value) {
    const img = new Image();
    img.onload = () => {
      imageElement.value = img;
      nextTick(() => {
        updateCanvasSize();
        processImage(img);
      });
    };
    img.onerror = () => {
      console.error("Error loading the image");
      imageUrl.value = null;
    };
    img.src = imageUrl.value;
  }
};

const handleFileChange = async (event) => {
  const files = (event.target as HTMLInputElement).files;
  if (files && files.length) {
    imageUrl.value = URL.createObjectURL(files[0]);
    loadImage();
  }
};

const processImage = async (image: HTMLImageElement) => {
  if (imageCanvas.value && image) {
    const canvas = imageCanvas.value;
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
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      faceapi.draw.drawDetections(canvas, resizedDetections);
      faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
      updateIdentifications(resizedDetections, image); // Pass the image here
    } catch (error) {
      console.error("Failed to detect faces:", error);
    }
  }
};

const updateIdentifications = (detections, image: HTMLImageElement) => { // Ensure 'image' is passed here
  identifications.value = [];
  croppedImagesDataUrls.value = [];
  const faceMatcher = new faceapi.FaceMatcher(authStore.gallery.map((person) => new faceapi.LabeledFaceDescriptors(person.name, [person.descriptor])));
  
  detections.forEach((detection, index) => {
    const bestMatch = faceMatcher.findBestMatch(detection.descriptor);
    const name = bestMatch.toString().split(" ")[0];
    identifications.value.push(name);

    const box = detection.detection.box;
    const cropCanvas = document.createElement('canvas');
    cropCanvas.width = box.width;
    cropCanvas.height = box.height;
    const cropCtx = cropCanvas.getContext('2d');
    cropCtx.drawImage(image, box.x, box.y, box.width, box.height, 0, 0, box.width, box.height); // Corrected reference
    croppedImagesDataUrls.value.push(cropCanvas.toDataURL());
  });
};

const updateCanvasSize = () => {
  if (imageCanvas.value && imageElement.value) {
    const ratio = imageElement.value.naturalHeight / imageElement.value.naturalWidth;
    imageCanvas.value.width = containerWidth.value;
    imageCanvas.value.height = containerWidth.value * ratio;
  }
};

watch(() => window.innerWidth, () => {
  if (imageCanvas.value) {
    containerWidth.value = imageCanvas.value.clientWidth;
    updateCanvasSize();
  }
}, { immediate: true });

onMounted(() => {
  window.addEventListener('resize', () => {
    if (imageCanvas.value) {
      containerWidth.value = imageCanvas.value.clientWidth;
      updateCanvasSize();
    }
  });
});
const findIdStudent = (name: string) => {
  const person = authStore.gallery.find((person: Person) => person.name === name);
  return person?.idStudent;
};

const handleUnknown = (index: number) => {
  faceStore.currentUnkownImage = croppedImagesDataUrls.value[index];
  router.push(`/mapping/${authStore.currentUser?.email.split('@')[0]}`);
};

const goToCheckAttendance = () => {
  router.push(`/checkAttendance/${courseStore.currentCourse?.idCourses}`);
};

</script>
<template>
  <v-container style="margin-top: 5%;">
    <v-card class="mb-5" color="primary" outlined>
      <v-card-title>
        <h1 class="text-h5">{{ courseStore.currentCourse?.nameCourses }}</h1>
      </v-card-title>
    </v-card>

    <!-- File Input and Check-in Button -->
    <v-row class="mb-4">
      <v-col cols="12" md="6">
        <v-file-input label="Upload Image" prepend-icon="mdi-camera" filled @change="handleFileChange" accept="image/*" outlined />
      </v-col>
      <v-col cols="12" md="6" class="d-flex justify-end align-center">
        <v-btn @click="goToCheckAttendance()" color="primary" class="mt-2"><v-icon left>mdi-account-file-text-outline</v-icon>Check Attendance</v-btn>
      </v-col>
    </v-row>

    <!-- Display loaded image and identifications -->
    <v-row style="width: 100%;">
      <v-col cols="12" md="6">
        <div v-if="imageUrl" style="position: relative; max-width: 100%;">
          <img :src="imageUrl" alt="Uploaded Image" style="width: 100%; height: auto;" />
          <canvas ref="imageCanvas" style="position: absolute; top: 0; left: 0; width: 100%;"></canvas>
        </div>
      </v-col>
      <v-col cols="12" md="6">
        <div v-if="identifications.length" class="py-2">
          <h3 style="padding: 10px;">Identifications:</h3>
          <v-row>
            <v-col v-for="(id, index) in identifications" :key="index" cols="12" sm="6" md="6" lg="4">
              <v-card class="mx-auto mb-4" style="max-width: 200px; background-color: rgb(217, 217, 217);" outlined>
                <v-card-text class="text-center single-line">{{ findIdStudent(id) }} ({{ id }})</v-card-text>
                <v-img :src="croppedImagesDataUrls[index]" height="150px" aspect-ratio="1.5" style="border-radius: 10%;"></v-img>
              </v-card>
            </v-col>
          </v-row>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.single-line {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>