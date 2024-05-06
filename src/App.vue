<template>
  <component
    :is="$route.meta.layout === 'mainLayout' ? MainLayout : FullLayout"
  ></component>
  <MainLayout></MainLayout>
</template>

<script setup lang="ts">
import FullLayout from "./components/Layout/FullLayout.vue";
import MainLayout from "./components/Layout/MainLayout.vue";
</script>

<style scoped>
/* Add your styles here */
</style>
