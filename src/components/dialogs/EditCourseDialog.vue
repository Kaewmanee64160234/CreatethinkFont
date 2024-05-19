<script lang="ts" setup>
import { useCourseStore } from "@/stores/course.store";
import EditCourseDialog2 from "./EditCourseDialog2.vue";
const courseStore = useCourseStore();
</script>

<template>
  <v-container>
    <v-row justify="center">
      <v-card style="width: 30vw">
        <v-card-title style="margin-left: 3%; margin-top: 1%">
          <h2>แก้ไขห้องเรียน</h2>
        </v-card-title>
        <v-card variant="outlined" class="cards textarea">
          <v-card-title>
            <h3 style="margin-bottom: 2%">แก้ไขชื่อรายวิชา</h3>
            <v-text-field
              clearable
              label="แก้ไขชื่อรายวิชา"
              variant="outlined"
              class="colorText"
              v-model="courseStore.currentCourse!.nameCourses"
            ></v-text-field>
          </v-card-title>
        </v-card>
        <v-card variant="outlined" class="cards textarea">
          <v-card-title>
            <h3>แก้ไขประเภทรายวิชา</h3>
            <v-select
              label="ประเภทรายวิชา"
              :items="['เลคเชอร์', 'เลคเชอร์และแลป']"
              v-model="courseStore.currentCourse!.typeCourses"
              variant="solo-filled"
              style="margin-top: 2%"
            ></v-select>
          </v-card-title>
        </v-card>
        <v-card-actions class="actions">
          <v-btn @click="courseStore.closeDialog2">ยกเลิก</v-btn>
          <v-btn @click="courseStore.showEditDialog2 = true" class="colorText"
            >ต่อไป
            <v-dialog v-model="courseStore.showEditDialog2" persistent>
              <EditCourseDialog2 />
            </v-dialog>
          </v-btn>
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
