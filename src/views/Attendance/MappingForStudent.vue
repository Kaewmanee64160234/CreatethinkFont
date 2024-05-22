<script setup lang="ts">
import { useAttendanceStore } from '../../stores/attendance.store';
// onmount get attdent by assigmtmentId
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();
onMounted(async () => {
    console.log('route: ' + route.params.assignmentId.toString());
    await adttendanceStore.getAttendanceByAssignmentId(route.params.assignmentId.toString());
})

const adttendanceStore = useAttendanceStore();
</script>
<template>
    <div v-for="attendance in adttendanceStore.attendances" :key="attendance.attendanceId">
      <img v-if="attendance.attendanceImage" :src="attendance.attendanceImage" alt="Attendance Image">
      <div>{{ attendance.attendanceStatus }}</div>
      <!-- Display other details -->
    </div>
  </template>
  

<style >
    
</style>