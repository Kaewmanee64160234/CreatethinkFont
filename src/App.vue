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

<style >
/* use font kanit */
@import url('https://fonts.googleapis.com/css2?family=Kanit:wght@300&display=swap');
body {
  font-family: 'Kanit', sans-serif;
}
</style>
