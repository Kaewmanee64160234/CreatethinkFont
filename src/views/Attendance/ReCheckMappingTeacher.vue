<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useAttendanceStore } from '../../stores/attendance.store';
import { useRoute } from 'vue-router';
import Attendance from '@/stores/types/Attendances';
import { useAssignmentStore } from '@/stores/assignment.store';
import Assignment from '@/stores/types/Assignment';
import { useCourseStore } from '@/stores/course.store';
import { useUserStore } from '@/stores/user.store';

const attendanceStore = useAttendanceStore();
const assignmentStore = useAssignmentStore();
const courseStore = useCourseStore();
const userStore = useUserStore();
const route = useRoute();
const url = 'http://localhost:3000'
onMounted(async () => {
  const id = route.params.assignmentId;
  await attendanceStore.getAttendanceByStatusInAssignment(id + '') // Assuming this function exists and fetches the attendances
  //get assignment by id
  await assignmentStore.getAssignmentById(id + '');
  await userStore.getUserByCourseId(assignmentStore.currentAssignment!.course!.coursesId.toString());
  await courseStore.getCourseById(assignmentStore.currentAssignment!.course!.coursesId.toString());

});

// confirm student 
const confirmAttendance = async (attendance: Attendance) => {
  if (confirm("Do you want to confirm this attendance?")) {
    try {
      attendance.attendanceStatus = 'present';
      attendance.attendanceConfirmStatus = 'confirmed';
      await attendanceStore.confirmAttendanceByTeacher(attendance.attendanceId + '');
      alert('Attendance has been confirmed.');
    } catch (error) {
      console.error("Error recording attendance:", error);
      alert('Failed to confirm attendance.');
    }
  }
};
//reject student
const reCheckAttendance = async (attendance: Attendance) => {
  try {
    attendance.attendanceStatus = 'present';
    attendance.attendanceConfirmStatus = 'recheck';
    await attendanceStore.rejectAttendanceByTeacher(attendance.attendanceId + '');
    alert('Attendance has been recheck.');
  } catch (error) {
    console.error("Error recording attendance:", error);
    alert('Failed to recheck attendance.');
  }
};
</script>

<template>
  <v-container fluid class="my-5">
    <div style="margin-top: 5%; margin-left: 5%;">
      <v-row style="padding: 10px;">
        <v-btn color="primary" @click="attendanceStore.checkAllAttendance(route.params.assignmentId + '')">Recheck</v-btn>
      </v-row>
      <v-row>
        <!-- Left column for student list (2/5 of the screen) -->
        <v-col cols="12" md="5">
          <v-card>
            <v-card-title>Student List</v-card-title>
            <v-card-text>
              <v-list dense>
                <v-list-item-group>
                  <v-list-item v-for="user in userStore.users" :key="user.userId">
                    <v-list-item-avatar>
                      <v-avatar size="56">
                        <v-img :src="`${url}/users/${user?.userId}/image`"></v-img>
                      </v-avatar>
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title>{{ user.firstName + ' ' + user.lastName }}</v-list-item-title>
                      <v-list-item-subtitle>{{ user.studentId }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-card-text>
          </v-card>
        </v-col>

        <!-- Right column for displaying student details and images (3/5 of the screen) -->
        <v-col cols="12" md="7">
          <v-card>
            <v-card-title>Details & Actions</v-card-title>
            <v-card-text>
              <div v-for="attendee in attendanceStore.attendances" :key="attendee.attendanceId">
                <v-card class="mb-2">
                  <v-row>
                    <v-col>
                      <v-img :src="`${url}/attendances/image/${attendee.attendanceImage}`" height="200px"></v-img>
                    </v-col>
                    <v-col>
                      <v-img :src="`${url}/users/${attendee.user?.userId}/image`" height="200px"></v-img>
                    </v-col>
                  </v-row>
                  <v-card-title>{{ attendee.user?.firstName }} {{ attendee.user?.lastName }}</v-card-title>
                  <v-card-subtitle>{{ attendee.user?.studentId }}</v-card-subtitle>
                  <v-card-text>
                    <div>Attendance Status: {{ attendee.attendanceStatus }}</div>
                  </v-card-text>
                  <v-card-actions>
                    <v-btn color="success" @click="confirmAttendance(attendee)" >Confirm</v-btn>
                    <v-btn color="warning" @click="reCheckAttendance(attendee)" >Recheck</v-btn>
                  </v-card-actions>
                </v-card>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>


<style scoped>
/* You can add additional styles here */
</style>
