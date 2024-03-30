<script lang="ts" setup>
import router from '@/router';
import { useAuthStore } from '@/stores/auth';
import { User } from '@/stores/types/User';
import { onMounted, ref } from 'vue';
import { decodeCredential, GoogleLogin } from 'vue3-google-login';
const authStore = useAuthStore();
const currentUser = ref<User>();
const loginError = ref(false);
const loginErrorMessage = ref('');
let galleryImageBase64 = '';

const callback = (response: any) => {
  console.log(response);

  if (response.credential) {
    const user = decodeCredential(response.credential);
    console.log('User:', user);
    console.log(user.hd);
    if (user.hd !== 'go.buu.ac.th') {
      alert(response.hd + ' is not a go.buu.ac.th domain');
    } else {
      authStore.currentUser = {
        email: user.email ,
        firstName: user.given_name,
        lastName: user.family_name,
        id: "",
        picture: user.picture,
      }
      authStore.login();
      router.push('/mapping2');

    }
  } else {
    loginErrorMessage.value = 'Unable to login. Please try again.';
    loginError.value = true;
  }
};

function findGalleryItemByEmail() {
  const username = authStore.currentUser.email.split('@')[0];
  const galleryItem = authStore.gallery.find(item => item.idStudent === username);
  const uint8Image = convertFloat32ToUint8(galleryItem?.descriptor);
  
  // Convert Uint8Array to string
  let str = '';
  for (let i = 0; i < uint8Image.length; i++) {
    str += String.fromCharCode(uint8Image[i]);
  }
  
  // Convert string to base64
  galleryImageBase64 = 'data:image/jpeg;base64,' + btoa(str);
}

  function convertFloat32ToUint8(gallery:any) {
  const minValue = Math.min(...gallery);
  const maxValue = Math.max(...gallery);
  const uint8Array = new Uint8Array(gallery.length);
  for (let i = 0; i < gallery.length; i++) {
      const normalizedValue = (gallery[i] - minValue) / (maxValue - minValue);
      const uint8Value = Math.round(normalizedValue * 255);
      uint8Array[i] = uint8Value;
  }
  
  return uint8Array;
}

</script>
<template>
  <div v-if="authStore.currentUser.email!=''">
    <h1>Welcome, {{ authStore.currentUser?.firstName + ' ' + authStore.currentUser?.lastName }}</h1>
    <img :src="authStore.currentUser?.picture" alt="User Picture" style="border-radius: 50%;margin-left: 2%;"/>
    <!-- button push to mapping2 -->
    <button>
      <router-link to="/mapping2">Mapping</router-link>
    </button>
    <div v-if="galleryImageBase64">
      <img :src="galleryImageBase64" alt="Gallery Image" />
    </div>
  </div>
  <div v-else>
    <GoogleLogin :callback="callback" />
    <p v-if="loginError">{{ loginErrorMessage }}</p>
  </div>
</template>


<style scoped>
/* Add your styles here */
</style>