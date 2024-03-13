<template>
  <button @click="loginWithGoogle">Login with Google</button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useAuthStore } from '@/stores/auth';

export default defineComponent({
  setup() {
    const authStore = useAuthStore();

    function loginWithGoogle() {
      authStore.loginWithGoogle();
    }

    return {
      loginWithGoogle,
    };
  },
});
</script>
