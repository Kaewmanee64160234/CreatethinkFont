<script setup lang="ts">
import Attendance from "@/stores/types/Attendances";
import { useAttendanceStore } from "../../stores/attendance.store";
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { useUserStore } from "@/stores/user.store";
import router from "@/router";
import { useCourseStore } from "@/stores/course.store";
import assignment from "@/services/assignment";
import { useAssignmentStore } from "@/stores/assignment.store";
const url = "http://localhost:3000";

const route = useRoute();
const attendanceStore = useAttendanceStore();
const userStore = useUserStore();
const courseStore = useCourseStore();
const assignmentStore = useAssignmentStore();

onMounted(async () => {
  await userStore.getCurrentUser();
  console.log(JSON.stringify(userStore.currentUser));
  await assignmentStore.getAssignmentById(route.params.assignmentId.toString());
  console.log(JSON.stringify(assignmentStore.currentAssignment));
  await attendanceStore.getAttendanceByAssignmentId(route.params.assignmentId.toString());
  await userStore.getUserByCourseId(courseStore.currentCourse!.coursesId!);
});

//confirm attendance
const confirmAttendance = async (attendance: Attendance) => {
  // Show a confirmation dialog
  if (confirm("Do you want to confirm this attendance?")) {
    try {
      // Set attendance status
      attendance.assignment = assignmentStore.currentAssignment;
      attendance.attendanceStatus = "present";
      attendance.attendanceConfirmStatus = "confirmed";
      if (attendance.user === null) {
        attendance.user = userStore.currentUser;
      }

      // Call store method to confirm attendance
      await attendanceStore.confirmAttendance(attendance);

      // Notify user of success
      alert("Attendance has been confirmed.");

      // Redirect after successful confirmation
      // router.push('/resheckMappingTeacher/' + assignmentStore.currentAssignment?.assignmentId); // Replace '/next-page-route' with your specific route
    } catch (error) {
      console.error("Error recording attendance:", error);
      alert("Failed to confirm attendance."); // Show error alert
    }
  }
};

const reCheckAttendance = async (attendance: Attendance) => {
  try {
    attendance.assignment = assignmentStore.currentAssignment;
    // if click this function after 15 minutes create assignment set attdent status to late
    const date = new Date();
    const currentDate = date.getTime();
    const assignmentDate = new Date(assignmentStore.currentAssignment!.createdDate!);
    const assignmentTime = assignmentDate.getTime();
    const diff = currentDate - assignmentTime;
    if (diff > 900000) {
      attendance.attendanceStatus = "late";
    } else {
      attendance.attendanceStatus = "present";
    }
    attendance.attendanceConfirmStatus = "recheck";
    attendance.user = userStore.currentUser;
    console.log(JSON.stringify(attendance));

    await attendanceStore.confirmAttendance(attendance);
    // router.push('/resheckMappingTeacher/' + assignmentStore.currentAssignment?.assignmentId); // Replace '/next-page-route' with your specific route
  } catch (error) {
    console.log(error);
  }
};

const goBackToCourseDetail = () => {
  router.push("/courseDetail/" + courseStore.currentCourse?.coursesId);
};
</script>
<template>
  <v-container style="margin-top: 5%">
    <v-card
      class="mx-auto"
      color="primary"
      max-width="1200"
      outlined
      style="padding: 20px"
    >
      <v-card-title>
        <h1 class="text-h5">{{ courseStore.currentCourse?.nameCourses }}</h1>
      </v-card-title>
    </v-card>
    <h1>ตรวจสอบการเข้าเรียน</h1>

    <v-btn
      fab
      dark
      icon
      absolute
      top
      right
      color="blue"
      @click="goBackToCourseDetail"
      style="top: 0; right: 0"
      :to="`/courseDetail/${courseStore.currentCourse?.coursesId!}`"
    >
      <v-icon>mdi-arrow-left</v-icon>
    </v-btn>

    <!-- Main content layout -->
    <v-row>
      <v-col
        v-for="student in attendanceStore.attendances"
        :key="student.attendanceId"
        cols="12"
        sm="6"
        md="4"
      >
        <v-card class="pa-3" outlined color="#D9D9D9">
          <!-- Student Information -->
          <v-row justify="center" align="center">
            <div class="d-flex flex-column">
              <div v-if="student.user">
                <div class="subtitle-1 bold-text mt-2">
                  <v-icon small>mdi-circle-small</v-icon>
                  {{ student.user.studentId + " " + student.user.firstName }}
                </div>
              </div>
              <div v-else class="text-center red--text bold-text mt-2">
                <v-icon small>mdi-circle-small</v-icon>ระบุไม่ได้
              </div>
            </div>
          </v-row>
          <v-row>
            <!-- Student Image -->
            <v-img
              :src="`${url}/attendances/image/${student.attendanceImage}`"
              height="200px"
              width="140px"
              class="mr-3 rounded-lg"
              :alt="`Student Image for ${
                student.user ? student.user.firstName : 'Unknown'
              }`"
            ></v-img>
          </v-row>

          <!-- Re-check Button -->
          <v-row class="mt-3">
            <v-col cols="12">
              <v-btn block color="#F6BB49" @click="reCheckAttendance(student)">
                ตรวจสอบอีกครั้ง
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>

    <!-- Floating 'Back to Course Details' Button -->
  </v-container>
</template>

<style>
.v-btn--active {
  background-color: #4caf50 !important;
  /* Active state color for 'เข้าเรียน' button when active */
}
.bold-text {
  font-weight: bold;
}
</style>
