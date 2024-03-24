<script lang="ts" setup>
import { useAuthStore } from '@/stores/auth';
import { User } from '@/stores/types/User';
import { ref } from 'vue';
import { decodeCredential, GoogleLogin } from 'vue3-google-login';
const authStore = useAuthStore();
const currentUser = ref<User>();
const loginError = ref(false);
const loginErrorMessage = ref('');

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

    }
  } else {
    loginErrorMessage.value = 'Unable to login. Please try again.';
    loginError.value = true;
  }
};
</script>
<template>
  <div v-if="authStore.currentUser">
    <h1>Welcome, {{ authStore.currentUser?.firstName + ' ' + authStore.currentUser?.lastName }}</h1>
    <img :src="authStore.currentUser?.picture" alt="User Picture" />
    <!-- button push to mapping2 -->
    <button>
      <router-link to="/mapping2">Mapping</router-link>
    </button>
  </div>
  <div v-else>
    <GoogleLogin :callback="callback" />
    <p v-if="loginError">{{ loginErrorMessage }}</p>
  </div>
</template>


<style scoped>
/* Add your styles here */
</style>