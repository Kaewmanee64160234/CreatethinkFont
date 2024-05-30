<script lang="ts" setup>
import { useCourseStore } from "@/stores/course.store";
import { onMounted, ref } from "vue";
import { useEnrollmentStore } from "@/stores/enrollment.store";
const courseStore = useCourseStore();
const enrollmentStore = useEnrollmentStore();
const selectedEnrollment = ref<number[]>([]);

const deleteSelectedEnrollments = async () => {
  for (const id of selectedEnrollment.value) {
    await enrollmentStore.deleteEnrollment(id);
  }
  selectedEnrollment.value = []; // Clear selected enrollments
  await enrollmentStore.getStudentByCourseId(courseStore.currentCourse!.coursesId);
  courseStore.closeDialog2();
};

onMounted(async () => {
  await enrollmentStore.getStudentByCourseId(courseStore.currentCourse!.coursesId);
});
</script>

<template>
  <v-container>
    <v-row justify="center">
      <v-card style="width: 30vw">
        <v-card-title style="margin-left: 3%; margin-top: 1%">
          <h2>แก้ไขรายชื่อนิสิต</h2>
        </v-card-title>
        <v-card
          variant="outlined"
          class="textarea"
          style="width: 27vw; overflow-y: scroll"
        >
          <v-card-title>
            <div style="margin-bottom: 2%">เลือกนิสิตที่จะลบออกจากวิชานี้</div>
          </v-card-title>
          <v-row v-for="(item, index) of enrollmentStore.enrollments" :key="index">
            <v-col cols="auto" style="margin-left: 2%; margin-bottom: 1%">
              <v-avatar size="50">
                <v-img :src="item.user?.profileImage"></v-img>
              </v-avatar>
            </v-col>
            <v-col align="left">
              <h3>{{ item.user?.firstName }} {{ item.user?.lastName }}</h3>
              <p>{{ item.user?.email }}</p>
            </v-col>
            <v-col cols="auto" align="right">
              <v-checkbox
                color="primary"
                v-model="selectedEnrollment"
                :value="item.enrollmentId"
              ></v-checkbox>
            </v-col>
          </v-row>
        </v-card>
        <v-card-actions class="actions">
          <v-btn @click="courseStore.closeDialog2">ยกเลิก</v-btn>
          <v-btn @click="deleteSelectedEnrollments()" class="colorText">เสร็จสิ้น</v-btn>
        </v-card-actions>
      </v-card>
    </v-row>
  </v-container>
</template>

<style>
.actions {
  justify-content: flex-end;
}

.cards {
  width: 27vw;
  margin: 2%;
}

.textarea {
  margin-left: 5%;
  border-color: #e0e0e0;
}

.colorText {
  color: #2a6ec5;
}

.font-bold {
  font-weight: bold;
}
</style>
