<script lang="ts" setup>
import { useCourseStore } from "@/stores/course.store";
import { ref } from "vue";
import CreateCourseDialog2 from "./CreateCourseDialog2.vue";
import course from "@/services/course";
import { useUserStore } from "@/stores/user.store";
const courseStore = useCourseStore();
const useStore = useUserStore();
const nameCourse = ref("");
const courseId = ref("");
const typeCourse = ref("");

const saveCourse = async () => {
  if (nameCourse.value === "" && typeCourse.value === "" && courseId.value === "") {
    console.log("no data");
    return;
  }
  const newCourse = {
    coursesId: courseId.value,
    nameCourses: nameCourse.value,
    typeCourses: typeCourse.value,
    credit: 0,
    session: "",
    stdAmount: 0,
    timeInLab: new Date(),
    timeOutLab: new Date(),
    timeInLec: new Date(),
    timeOutLec: new Date(),
    fullScore: 0,
    userId: 1,
    createdDate: undefined,
    updatedDate: undefined,
    deletedDate: undefined, //mockup data ข้อมูลไม่ตรงกับหลังบ้าน
  };
  try {
    // ส่งคำขอสร้าง course
    await courseStore.createCourse(newCourse);
    console.log("course", newCourse);
    courseStore.showCreateDialog2 = true;
    nameCourse.value = "";
    courseId.value = "";
    typeCourse.value = "";
  } catch (error) {
    console.error("Error creating course:", error);
  }
};
</script>

<template>
  <v-container>
    <v-row justify="center">
      <v-card style="width: 30vw">
        <v-card-title style="margin-left: 3%; margin-top: 1%">
          <h2>เพิ่มห้องเรียน</h2>
        </v-card-title>
        <!-- <v-card variant="outlined" class="textarea" style="width: 27vw;">
                    <v-row>
                        <v-card-title style="margin-top: 1%;margin-left: 2%;">
                            <p>ขณะนี้คุณลงชื่อเข้าใช้เป็น</p>
                        </v-card-title>
                    </v-row>
                    <v-row>
                        <v-col cols="auto" style="margin-left: 2%;margin-bottom: 1%;">
                            <v-avatar size="70">
                                <v-img src="https://cdn.vuetifyjs.com/images/john.png"></v-img>
                            </v-avatar>
                        </v-col>
                        <v-col align="left" style="margin-top: 2%;">
                            <p>Name</p>
                            <p>มิสแกรนด์</p>
                        </v-col>
                    </v-row>
                </v-card> -->
        <v-card variant="outlined" class="cards textarea">
          <v-card-title>
            <h3 style="margin-bottom: 2%">สร้างชื่อรายวิชา</h3>
            <v-text-field
              clearable
              label="สร้างชื่อรายวิชา"
              variant="outlined"
              class="colorText"
              v-model="nameCourse"
            ></v-text-field>
          </v-card-title>
        </v-card>
        <v-card variant="outlined" class="cards textarea">
          <v-card-title>
            <h3>สร้างรหัสห้องเรียน</h3>
            <p>อาจารย์ผู้สอนสร้างรหัสห้องเรียน โดยต้องมีตัวอักษร</p>
            <p style="margin-bottom: 2%">อย่างน้อย 8 ตัวอักษร</p>
            <v-text-field
              clearable
              label="รหัสห้องเรียน"
              variant="outlined"
              class="colorText"
              v-model="courseId"
            ></v-text-field>
          </v-card-title>
        </v-card>
        <v-card variant="outlined" class="cards textarea">
          <v-card-title>
            <h3>เพิ่มประเภทรายวิชา</h3>
            <v-select
              label="ประเภทรายวิชา"
              :items="['เลคเชอร์', 'เลคเชอร์และแลป']"
              variant="solo-filled"
              style="margin-top: 2%"
              v-model="typeCourse"
            ></v-select>
          </v-card-title>
        </v-card>
        <v-card-actions class="actions">
          <v-btn @click="courseStore.closeDialog">ยกเลิก</v-btn>
          <v-btn @click="saveCourse()" class="colorText">ต่อไป</v-btn>
        </v-card-actions>
        <v-dialog v-model="courseStore.showCreateDialog2" persistent>
          <CreateCourseDialog2 />
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

.font-bold {
  font-weight: bold;
}
</style>
