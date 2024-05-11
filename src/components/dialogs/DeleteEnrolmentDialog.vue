<script lang="ts" setup>
import { useCourseStore } from "@/stores/course.store";
const courseStore = useCourseStore();


</script>

<template>
    <v-container>
        <v-row justify="center">
            <v-card class="cardText">
                <v-card-title class="text-h4 mt-6" style="text-align: center;">ต้องการยกเลิกการลงทะเบียนในรายวิชา {{ courseStore.currentCourse?.nameCourses }} หรือไม่</v-card-title>
                <v-card-actions class="actions">
                    <v-btn class="text-h5" >ยกเลิก</v-btn>
                    <v-btn class="colorText text-h5">ยกเลิกการลงทะเบียน
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-row>
    </v-container>
</template>


<style>
.actions {
    justify-content: flex-end;
    margin-top: 3%;
}
.colorText {
    color: #2A6EC5;
}
.cardText {
    width: auto;
    height: 18vh;
}
</style>