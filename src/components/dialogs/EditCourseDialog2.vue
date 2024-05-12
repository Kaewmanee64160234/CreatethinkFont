<script lang="ts" setup>
import { useCourseStore } from "@/stores/course.store";
import { ref } from "vue";
import EditCourseDialog3 from "./EditCourseDialog3.vue";
const courseStore = useCourseStore();

</script>

<template>
    <v-container>
        <v-row justify="center">
            <v-card style="width: 30vw;">
                <v-card-title style="margin-left: 3%;margin-top: 1%;">
                    <h2>แก้ไขห้องเรียน</h2>
                </v-card-title>
                <v-card variant="outlined" class="textarea" style="width: 27vw;">
                    <v-card-title>
                        <h3 style="margin-bottom: 2%;">สร้างรายละเอียดวิชา</h3>
                        <v-row style="height: 8vh;">
                            <v-col cols="3">
                                <p>กลุ่มเรียนที่</p>
                            </v-col>
                            <v-col align="left" class="fields">
                                <v-text-field variant="outlined" v-model="courseStore.editCourse!.session"></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row style="height: 8vh;">
                            <v-col cols="3">
                                <p>รหัสวิชา</p>
                            </v-col>
                            <v-col align="left" class="fields">
                                <v-text-field variant="outlined" v-model="courseStore.editCourse!.coursesId"></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row style="height: 8vh;">
                            <v-col cols="3">
                                <p>จำนวนหน่วยกิต</p>
                            </v-col>
                            <v-col align="left" class="fields">
                                <v-text-field variant="outlined" v-model="courseStore.editCourse!.credit"></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row style="height: 8vh;">
                            <v-col cols="3">
                                <p>จำนวนนักเรียน</p>
                            </v-col>
                            <v-col align="left" class="fields">
                                <v-text-field variant="outlined" v-model="courseStore.editCourse!.stdAmount"></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row style="height: 8vh;">
                            <v-col cols="5">
                                <p>เวลาเริ่มเรียนเลคเชอร์</p>
                            </v-col>
                            <v-col align="left" class="fields">
                                <v-text-field variant="outlined">
                                    <v-icon>mdi-calendar</v-icon>
                                </v-text-field>
                            </v-col>
                        </v-row>
                        <v-row style="height: 8vh;">
                            <v-col cols="5">
                                <p>เวลาเลิกเรียนเลคเชอร์</p>
                            </v-col>
                            <v-col align="left" class="fields">
                                <v-text-field variant="outlined">
                                    <v-icon>mdi-calendar</v-icon>
                                </v-text-field>
                            </v-col>
                        </v-row>
                        <v-row style="height: 8vh;margin-bottom: 2%;">
                            <v-col cols="3">
                                <p>คะแนนเต็ม</p>
                            </v-col>
                            <v-col align="left" class="fields">
                                <v-text-field variant="outlined" v-model="courseStore.editCourse!.fullScore"></v-text-field>
                            </v-col>
                        </v-row>
                    </v-card-title>
                </v-card>
                <v-card-actions class="actions">
                    <v-btn @click="courseStore.closeDialog2">ยกเลิก</v-btn>
                    <v-btn @click="courseStore.showEditDialog3 = true" class="colorText">ต่อไป
                    </v-btn>
                </v-card-actions>
                <v-dialog v-model="courseStore.showEditDialog3" max-width="2900px">
                    <EditCourseDialog3 />
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
    border-color: #E0E0E0;
}

.colorText {
    color: #2A6EC5;
}

.font-bold {
    font-weight: bold;
}
</style>