<template>
    <div>Authenticating...</div>
  </template>
  
  <script lang="ts">
  import { defineComponent, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import { useAuthStore } from '@/stores/auth';
  
  export default defineComponent({
    setup() {
      const route = useRoute();
      const authStore = useAuthStore();
  
      onMounted(() => {
        const user = route.query.user;
        if (user) {
          authStore.setUser(JSON.parse(user as string));
          // Redirect to a secure page or dashboard
        } else {
          // Handle error or redirect to login page
        }
      });
    },
  });
  </script>
  