<script lang="ts" setup>
import { useCourseStore } from "@/stores/course.store";
import { ref } from "vue";
import CreateCourseDialog2 from "./CreateCourseDialog2.vue";
import course from "@/services/course";
const courseStore = useCourseStore();

</script>

<template>
    <v-container>
        <v-row justify="center">
            <v-card style="width: 30vw;">
                <v-card-title style="margin-left: 3%;margin-top: 1%;">
                    <h2>เพิ่มห้องเรียน</h2>
                </v-card-title>
                <v-card variant="outlined" class="textarea" style="width: 27vw;">
                    <v-row>
                        <v-card-title style="margin-top: 1%;margin-left: 2%;">
                        <p>ขณะนี้คุณลงชื่อเข้าใช้เป็น</p>
                    </v-card-title>
                    </v-row>
                    <v-row >
                        <v-col cols="auto"  style="margin-left: 2%;margin-bottom: 1%;">
                        <v-avatar size="70">
                            <v-img src="https://cdn.vuetifyjs.com/images/john.png"></v-img>
                        </v-avatar>
                    </v-col>
                    <v-col align="left" style="margin-top: 2%;">
                        <p>Name</p>
                        <p>มิสแกรนด์</p>
                    </v-col>
                    <v-col style="margin-top: 3%;">
                        <v-btn class="colorText font-bold">เปลี่ยนบัญชีผู้ใช้</v-btn>
                    </v-col>
                    </v-row>
                </v-card>
                <v-card variant="outlined" class="cards textarea">
                    <v-card-title>
                        <h3 style="margin-bottom: 2%;">สร้างชื่อรายวิชา</h3>
                        <v-text-field clearable label="สร้างชื่อรายวิชา" variant="outlined" class="colorText"></v-text-field>
                    </v-card-title>
                </v-card>
                <v-card variant="outlined" class="cards textarea">
                    <v-card-title>
                        <h3>สร้างรหัสห้องเรียน</h3>
                        <p>อาจารย์ผู้สอนสร้างรหัสห้องเรียน โดยต้องมีตัวอักษร</p>
                        <p style="margin-bottom: 2%;">อย่างน้อย 8 ตัวอักษร</p>
                        <v-text-field clearable label="รหัสห้องเรียน" variant="outlined" class="colorText"></v-text-field>
                    </v-card-title>
                </v-card>
                <v-card-actions class="actions">
                    <v-btn @click="courseStore.closeDialog">ยกเลิก</v-btn>
                    <v-btn @click="courseStore.showDialog2 = true" class="colorText">ต่อไป
                        <v-dialog v-model="courseStore.showDialog2" persistent>
                            <CreateCourseDialog2></CreateCourseDialog2>
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
    border-color: #E0E0E0;
}
.colorText {
    color: #2A6EC5;
}
.font-bold {
    font-weight: bold;
  }
</style>