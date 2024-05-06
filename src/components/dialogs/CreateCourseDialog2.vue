<script lang="ts" setup>
import { useCourseStore } from "@/stores/course.store";
import { ref } from "vue";
import CreateCourseDialog3 from "./CreateCourseDialog3.vue";
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
                    <v-card-title>
                        <h3 style="margin-bottom: 2%;">สร้างรายละเอียดวิชา</h3>
                        <v-row style="height: 8vh;">
                            <v-col cols="3">
                                <p>กลุ่มเรียนที่</p>
                            </v-col>
                            <v-col align="left" class="fields">
                                <v-text-field variant="outlined"></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row style="height: 8vh;">
                            <v-col cols="3">
                                <p>รหัสวิชา</p>
                            </v-col>
                            <v-col align="left" class="fields">
                                <v-text-field variant="outlined"></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row style="height: 8vh;">
                            <v-col cols="3">
                                <p>จำนวนหน่วยกิต</p>
                            </v-col>
                            <v-col align="left" class="fields">
                                <v-text-field variant="outlined"></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row style="height: 8vh;">
                            <v-col cols="3">
                                <p>จำนวนนักเรียน</p>
                            </v-col>
                            <v-col align="left" class="fields">
                                <v-text-field variant="outlined"></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row style="height: 8vh;">
                            <v-col cols="3">
                                <p>เวลาเริ่มเรียน</p>
                            </v-col>
                            <v-col align="left" class="fields">
                                <v-text-field variant="outlined"></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row style="height: 8vh;">
                            <v-col cols="3">
                                <p>เวลาเลิกเรียน</p>
                            </v-col>
                            <v-col align="left" class="fields">
                                <v-text-field variant="outlined"></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row style="height: 8vh;margin-bottom: 2%;">
                            <v-col cols="3">
                                <p>คะแนนเต็ม</p>
                            </v-col>
                            <v-col align="left" class="fields">
                                <v-text-field variant="outlined"></v-text-field>
                            </v-col>
                        </v-row>
                    </v-card-title>
                </v-card>
                <v-card-actions class="actions">
                    <v-btn @click="courseStore.closeDialog">ยกเลิก</v-btn>
                    <v-btn @click="courseStore.showDialog3 = true" class="colorText">ต่อไป
                        <v-dialog v-model="courseStore.showDialog3" persistent>
                            <CreateCourseDialog3></CreateCourseDialog3>
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

.fields {
    margin-left: 2%;
}
</style>