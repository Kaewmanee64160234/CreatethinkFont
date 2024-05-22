<script setup lang="ts">
import { useAttendanceStore } from '../../stores/attendance.store';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const attendanceStore = useAttendanceStore();

onMounted(async () => {
    console.log('route: ' + route.params.assignmentId.toString());
    await attendanceStore.getAttendanceByAssignmentId(route.params.assignmentId.toString());
});
</script>

<template>
  <div class="container">
    <div v-for="student in attendanceStore.attendances" :key="student.attendanceId" class="card">
      <img v-if="student.attendanceImage" :src="student.attendanceImage" alt="Student Image" class="student-image">
      <div v-if="student.user" class="student-info">
        <div>{{ student.user.studentId }}</div>
        <div>{{ student.user.firstName }}</div>
      </div>
      <div v-else class="student-info unknown">
        Unknown
      </div>
      <button class="btn" :class="{'active': student.attendanceStatus === 'เข้าเรียน'}">เข้าเรียน</button>
      <button class="btn" :class="{'active': student.attendanceStatus === 'ตรวจสอบอีกครั้ง'}">ตรวจสอบอีกครั้ง</button>
    </div>
  </div>
</template>

<style>
.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.card {
  width: 250px;
  margin: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  text-align: center;
  padding: 20px;
}
.student-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 5px;
}
.student-info {
  margin-top: 10px;
  font-size: 18px;
}
.unknown {
  color: red;
}
.btn {
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  border: none;
  color: white;
  cursor: pointer;
}
.btn.active {
  background-color: green;
}
</style>
