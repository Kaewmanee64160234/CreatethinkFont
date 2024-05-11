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
                    <h2>แก้ไขรายชื่อนิสิต</h2>
                </v-card-title>
                <v-card variant="outlined" class="textarea" style="width: 27vw;overflow-y: scroll;">
                    <v-card-title>
                        <div style="margin-bottom: 2%;">เลือกนิสิตที่จะเข้าร่วมในรายวิชานี้</div>
                    </v-card-title>
                    <v-row>
                        <v-col cols="auto"  style="margin-left: 2%;margin-bottom: 1%;">
                            <v-avatar size="50">
                                <v-img src="https://cdn.vuetifyjs.com/images/john.png"></v-img>
                            </v-avatar>
                        </v-col>
                        <v-col align="left">
                            <h3>Name</h3>
                            <p>มิสแกรนด์</p>
                        </v-col>
                        <v-col cols="auto" align="right">
                            <v-checkbox color="primary"></v-checkbox>
                        </v-col>
                    </v-row>
                </v-card>
                <v-card-actions class="actions">
                    <v-btn @click="courseStore.closeDialog2">ยกเลิก</v-btn>
                    <v-btn class="colorText">เสร็จสิ้น</v-btn>
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