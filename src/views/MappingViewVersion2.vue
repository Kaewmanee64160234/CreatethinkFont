<script setup lang="ts">
import { ref, onMounted, nextTick } from "vue";
import * as faceapi from "face-api.js";
import Person from "@/stores/types/Person";
import { useAuthStore } from "@/stores/auth";
import { useFaceStore } from "@/stores/face.store";
import { useRouter } from "vue-router";


const croppedImagesDataUrls = ref([]);
const authStore = useAuthStore();
const imageUrl = ref<string | null>(null);
const identifications = ref<string[]>([]);
const imageCanvas = ref<HTMLCanvasElement | null>(null);
const faceStore = useFaceStore();
const router = useRouter();

const drawer = ref(false);
async function loadModels() {
  await Promise.all([
    faceapi.nets.ssdMobilenetv1.loadFromUri("/models"),
    faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
    faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
  ]);
}

onMounted(async () => {
  await loadModels();
});
const handleFileChange = async (event: any) => {
  const { files } = event.target;
  if (!files || !files.length) return;

  imageUrl.value = URL.createObjectURL(files[0]);
  await nextTick();

  const imageElement = new Image();
  imageElement.onload = async () => {
    if (imageCanvas.value) {
      const canvas = imageCanvas.value;
      canvas.width = imageElement.naturalWidth;
      canvas.height = imageElement.naturalHeight;


      const ctx = canvas.getContext("2d");
      const displaySize = { width: imageElement.naturalWidth, height: imageElement.naturalHeight };
      faceapi.matchDimensions(canvas, displaySize);

      const detections = await faceapi.detectAllFaces(imageElement, new faceapi.SsdMobilenetv1Options()).withFaceLandmarks().withFaceDescriptors();
      const resizedDetections = faceapi.resizeResults(detections, displaySize);
      canvas.style.width = '100%';
      canvas.style.height = 'auto';
      canvas.style.position = 'absolute';
      canvas.style.top = '0';
      canvas.style.left = '0';
      ctx!.clearRect(0, 0, canvas.width, canvas.height);
      faceapi.draw.drawDetections(canvas, resizedDetections);
      faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);

      identifications.value = [];
      croppedImagesDataUrls.value = [];

      const faceMatcher = new faceapi.FaceMatcher(authStore.gallery.map(person => new faceapi.LabeledFaceDescriptors(person.name, [person.descriptor])));

      resizedDetections.forEach((detection, index) => {
        const bestMatch = faceMatcher.findBestMatch(detection.descriptor);
        const name = bestMatch.toString().split(" ")[0];
        identifications.value.push(name);

        const box = detection.detection.box;
        const cropCanvas = document.createElement('canvas');
        cropCanvas.width = box.width;
        cropCanvas.height = box.height;
        const cropCtx = cropCanvas.getContext('2d');
        cropCtx!.drawImage(imageElement, box.x, box.y, box.width, box.height, 0, 0, box.width, box.height);
        const croppedImageUrl = cropCanvas.toDataURL();
        croppedImagesDataUrls.value.push(croppedImageUrl);
      });
    }
  };
  imageElement.src = imageUrl.value;
};
const identifyFacesInScene = (sceneDescriptors: Float32Array[]) => {
  const labeledFaceDescriptors = authStore.gallery.map(
    (person) =>
      new faceapi.LabeledFaceDescriptors(person.name, [person.descriptor])
  );
  const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors);
  //set identifications and persent to the user
  identifications.value = sceneDescriptors.map((descriptor) => {
    const bestMatch = faceMatcher.findBestMatch(descriptor);
    return bestMatch.toString().split(" ")[0]; // Assuming the name is the first part of the string
  });
  return sceneDescriptors.map((descriptor) => {
    const bestMatch = faceMatcher.findBestMatch(descriptor);
    return bestMatch.toString().split(" ")[0]; // Assuming the name is the first part of the string
  });
};
//find idstudent by name
const findIdStudent = (name: string) => {
  const person = authStore.gallery.find((person) => person.name === name);
  return person?.idStudent;
};

//create function handle with unknown by parameter is unknown image
const handleUnknown = (index: number) => {
  faceStore.currentUnkownImage = croppedImagesDataUrls.value[index];
  router.push(`/mapping/${authStore.currentUser?.email.split('@')[0]}`);
};
</script>


<template>
  <v-card>
    <v-layout>
      <!-- <v-system-bar color="deep-purple darken-3"></v-system-bar> -->

      <v-app-bar color="primary" prominent>
        <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

        <v-toolbar-title>Student Attendance</v-toolbar-title>

        <v-spacer></v-spacer>
        <v-btn icon="mdi-plus" variant="text"></v-btn>

        <v-toolbar-title>name: {{ authStore.currentUser.firstName + ' ' + authStore.currentUser.lastName
          }}</v-toolbar-title>

      </v-app-bar>

      <v-navigation-drawer v-model="drawer" location="left">
        <v-list>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Profile</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-account-group</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Students</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-camera</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Mapping</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-main>
        <v-card style="margin: 10px; background-color: blanchedalmond;">
          <v-card-title>Creative Thinking </v-card-title>
        </v-card>

        <div style="margin: 10px;">
          <table>
            <td width="50%"> <v-file-input label="File input" style="width: 40vw;" prepend-icon="mdi-camera"
                variant="filled" @change="handleFileChange" accept="image/*"></v-file-input>
              <!-- <input type="file" @change="handleFileChange" accept="image/*"   /> -->
              <div v-if="imageUrl" style="position: relative; max-width: 70vw;">
                <img :src="imageUrl" alt="Uploaded Image" style="width: 100%; height: auto;" />
                <canvas ref="imageCanvas" style="position: absolute; top: 0; left: 0;"></canvas>
              </div>
            </td>
            <td width="50%">
              <div style="height: 50px;"></div>
              <div style="padding: 10px;" v-if="identifications.length">
                <h3>Identifications:</h3>
                <ul>
                  <li class="ma-5" v-for="(id, index) in identifications" :key="index">

                    <table>
                      <tr>{{ findIdStudent(id) + ` (${id})` }}</tr>
                      <tr>
                        <td style="width: 150px;">
                          <img :src="croppedImagesDataUrls[index]" alt="Cropped Face"
                            style="width: 100px; height: auto;" />

                        </td>
                        <td class="d-flex justify-start">
                          <v-btn v-if="authStore.currentUser?.email.split('@')[0] === findIdStudent(id)">Confirm Your
                            Image</v-btn>
                          <v-btn v-if="id == 'unknown'" @click="handleUnknown(index)">

                            Identify Is Me!!
                          </v-btn>

                          <v-btn
                            v-if="authStore.currentUser?.email.split('@')[0] !== findIdStudent(id) && id !== 'unknown'">Identify
                            Wrong!! This is me!!</v-btn>
                        </td>
                      </tr>
                      <!-- <tr>{{ findIdStudent(id) + ` (${id})` }}</tr> -->
                    </table>


                    <!-- button for report detection worng -->
                  </li>
                  {{ authStore.currentUser?.email.split('@')[0] }}
                </ul>
              </div>
            </td>
          </table>


        </div>
      </v-main>
    </v-layout>
  </v-card>

</template>
