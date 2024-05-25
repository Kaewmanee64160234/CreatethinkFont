<script lang="ts" setup>
import { useCourseStore } from "@/stores/course.store";
import CreateEnrolmentDialog2 from "./CreateEnrolmentDialog2.vue";
import { useEnrollmentStore } from "@/stores/enrollment.store";
import { ref } from "vue";
const courseStore = useCourseStore();
const enrollmentStore = useEnrollmentStore();
const courseId = ref("");

const saveEnrollment = () => {
  if (courseId.value.length < 8) {
    console.log("no data");
    return;
  }
  const newEnrollment = {
    userId: 4, ///mouckup data
    courseId: courseId.value,
    createdDate: undefined,
    updatedDate: undefined,
    deletedDate: undefined,
  };
  try {
    // ส่งคำขอสร้าง enrollment
    enrollmentStore.createEnrollment(newEnrollment);
    console.log("enrollment", newEnrollment);
    courseStore.showCreateDialog2 = true;
    courseId.value = "";
  } catch (error) {
    console.error("Error creating enrollment:", error);
  }
};
</script>

<template>
  <v-container>
    <v-row justify="center">
      <v-card style="width: 30vw">
        <v-card-title style="margin-left: 3%; margin-top: 1%">
          <h2>เข้าร่วมชั้นเรียน</h2>
        </v-card-title>
        <v-card variant="outlined" class="cards textarea">
          <v-card-title>
            <h3>รหัสห้องเรียน</h3>
            <div class="title">
              สอบถามรหัสห้องเรียนจากอาจารย์ผู้สอน หลังจากนั้นให้กรอกลงในช่องด้านล่าง
            </div>
            <v-text-field
              clearable
              label="รหัสห้องเรียน"
              variant="outlined"
              class="colorText"
              v-model="courseId"
              :rules="[
                (v) =>
                  /^[A-Za-z0-9]{8,}$/.test(v) ||
                  'โปรดกรอกรหัสห้องเรียนอย่างน้อย 8 ตัวอักษร',
              ]"
            ></v-text-field>
          </v-card-title>
        </v-card>
        <v-card-actions class="actions">
          <v-btn @click="courseStore.closeDialog">ยกเลิก</v-btn>
          <v-btn @click="saveEnrollment" class="colorText">ต่อไป</v-btn>
        </v-card-actions>
        <v-dialog v-model="courseStore.showCreateDialog2" persistent>
          <CreateEnrolmentDialog2 />
        </v-dialog>
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

.title {
  word-wrap: break-word;
  white-space: normal;
  margin-bottom: 2%;
}
</style>
