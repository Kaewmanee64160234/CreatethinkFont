<script lang="ts" setup>
import { googleSdkLoaded } from "vue3-google-login";
const login = () => {
  googleSdkLoaded((google) => {
    google.accounts.oauth2
      .initCodeClient({
        client_id:
          "340551090181-5kdbme7veu6bf5radv3efb9o3j6mdpqu.apps.googleusercontent.com",
        scope: "email profile openid",
        callback: (response) => {
          console.log("Handle the response", response);
          //consol profile fistname lastname
          // console.log(response.getBasicProfile().getGivenName())
          console.log(response.getBasicProfile().getFamilyName());
        },
      })
      .requestCode();
  });
};
</script>

<template>
  <button @click="login">Login Using Google</button>
</template>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
