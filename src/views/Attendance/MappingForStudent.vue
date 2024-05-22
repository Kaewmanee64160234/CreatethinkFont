<script setup lang="ts">
import Attendance from '@/stores/types/Attendances';
import { useAttendanceStore } from '../../stores/attendance.store';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useUserStore } from '@/stores/user.store';
import router from '@/router';

const route = useRoute();
const attendanceStore = useAttendanceStore();
const userStore = useUserStore();

onMounted(async () => {
  await userStore.getUsers();
  userStore.currentUser = userStore.users.find(user => user.studentId === "64160049");
  console.log('route: ' + route.params.assignmentId.toString());
  await attendanceStore.getAttendanceByAssignmentId(route.params.assignmentId.toString());
});

//confirm attendance
const confirmAttendance = async (attendance: Attendance) => {
  attendance.attendanceStatus = 'persent';
  attendance.attendanceConfirmStatus = 'confirm';
  if (attendance.user === null) {
    attendance.user = userStore.currentUser;
  }
  console.log(attendance);
  await attendanceStore.confirmAttendance(attendance);
};
</script>
<template>
  <v-container style="margin-top: 5%;">
    {{ userStore.currentUser?.studentId }}
    
    <v-row>
      <v-col v-for="student in attendanceStore.attendances" :key="student.attendanceId" cols="12" sm="6" md="4">
        <v-card class="pa-3" outlined>
          <!-- Student image and information -->
          <div class="d-flex flex-row align-center">
            <v-img :src="student.attendanceImage" height="200px" width="140px" class="mr-3"
              :alt="`Student Image for ${student.user ? student.user.firstName : 'Unknown'}`"></v-img>

            <!-- Student Info -->
            <div class="d-flex flex-column justify-space-between">
              <div v-if="student.user" class="text-center">
                <div class="subtitle-1">{{ student.user.studentId }}</div>
                <div class="headline">{{ student.user.firstName }}</div>
              </div>
              <div v-else class="text-center red--text">
                Unknown
              </div>
            </div>
          </div>

          <!-- Buttons -->
          <v-row class="mt-3">
            <v-col cols="12">
              <v-btn v-if="student.user?.studentId == userStore.currentUser!.studentId"
                @click="confirmAttendance(student)" block color="green"
                :class="{ 'v-btn--active': student.attendanceStatus === 'เข้าเรียน' }">
                ยืนยันการเข้าเรียน
              </v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-btn block color="orange" :class="{ 'v-btn--active': student.attendanceStatus === 'ตรวจสอบอีกครั้ง' }">
                ตรวจสอบอีกครั้ง
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style>
.v-btn--active {
  background-color: #4CAF50 !important;
  /* Active state color for 'เข้าเรียน' button when active */
}
</style>
