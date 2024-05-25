<script setup lang="ts">
import Attendance from '@/stores/types/Attendances';
import { useAttendanceStore } from '../../stores/attendance.store';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useUserStore } from '@/stores/user.store';
import router from '@/router';
import { useCourseStore } from '@/stores/course.store';
import assignment from '@/services/assignment';
import { useAssignmentStore } from '@/stores/assignment.store';

const route = useRoute();
const attendanceStore = useAttendanceStore();
const userStore = useUserStore();
const courseStore = useCourseStore();
const assignmentStore = useAssignmentStore();

onMounted(async () => {
  await userStore.getUsers();
  userStore.currentUser = userStore.users.find(user => user.studentId === "64160234");
  console.log(JSON.stringify(userStore.currentUser));
assignmentStore.assignment = assignmentStore.assignments.find(assignment => assignment.assignmentId ===  parseInt(route.params.assignmentId+'') );
  console.log('route: ' + route.params.assignmentId.toString());
  await attendanceStore.getAttendanceByAssignmentId(route.params.assignmentId.toString());
});

//confirm attendance
const confirmAttendance = async (attendance: Attendance) => {
  // Show a confirmation dialog
  if (confirm("Do you want to confirm this attendance?")) {
    try {
      // Set attendance status
      attendance.assignment = assignmentStore.assignment;
      attendance.attendanceStatus = 'present';
      attendance.attendanceConfirmStatus = 'confirmed';
      if (attendance.user === null) {
        attendance.user = userStore.currentUser;
      }

      // Call store method to confirm attendance
      await attendanceStore.confirmAttendance(attendance);

      // Notify user of success
      alert('Attendance has been confirmed.');

      // Redirect after successful confirmation
      router.push('/resheckMappingTeacher/' + assignmentStore.assignment?.assignmentId); // Replace '/next-page-route' with your specific route
    } catch (error) {
      console.error("Error recording attendance:", error);
      alert('Failed to confirm attendance.'); // Show error alert
    }
  }
};

const reCheckAttendance = async (attendance: Attendance) => {
  try {
    attendance.assignment = assignmentStore.assignment;

    attendance.attendanceStatus = 'recheck';
    attendance.attendanceConfirmStatus = 'recheck';
    attendance.user = userStore.currentUser;
    console.log(JSON.stringify(attendance));
    await attendanceStore.confirmAttendance(attendance);
    router.push('/resheckMappingTeacher/' + assignmentStore.assignment?.assignmentId); // Replace '/next-page-route' with your specific route

  } catch (error) {
    console.log(error);
  }


}

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
              <v-btn v-if="student.user?.studentId == userStore.currentUser!.studentId && student.attendanceConfirmStatus != 'recheck' && student.attendanceConfirmStatus != 'confirmed'"
                @click="confirmAttendance(student)" block color="green"
               >
                ยืนยันการเข้าเรียน
              </v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-btn block color="orange" @click="reCheckAttendance(student)"
              :disabled="student.attendanceConfirmStatus=='recheck'">
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
