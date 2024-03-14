<template>
  <router-view></router-view>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { googleSdkLoaded, decodeCredential, GoogleLogin } from 'vue3-google-login';
import { User } from './stores/types/User';

const currentUser = ref<User>();
const loginError = ref(false);
const loginErrorMessage = ref('');

const callback = (response: any) => {
  console.log(response);

  if (response.credential) {
    const user = decodeCredential(response.credential);
    console.log('User:', user);
console.log(user.hd);
   if(user.hd !=='go.buu.ac.th'){
    alert(response.hd + ' is not a go.buu.ac.th domain');
   }else{
    currentUser.value = {
      email: user.email,
      firstName: user.given_name,
      lastName: user.family_name,
      id: "",
      picture:user.picture,
    }
   
   }
  } else {
    loginErrorMessage.value = 'Unable to login. Please try again.';
    loginError.value = true;
  }
};
</script>

<style scoped>
/* Add your styles here */
</style>
