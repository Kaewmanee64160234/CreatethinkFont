<script lang="ts" setup>
import { useCourseStore } from "@/stores/course.store";
const courseStore = useCourseStore();

const deleteCourse = (idCourse : string) => {
    courseStore.deleteCourse(idCourse);
    courseStore.showDeleteDialog = false;
}

</script>

<template>
    <v-container>
        <v-row justify="center">
            <v-card>
                <v-card-title>ต้องการลบรายวิชา {{ courseStore.currentCourse?.nameCourses }} หรือไม่</v-card-title>
                <v-card-actions class="actions">
                    <v-btn @click="courseStore.showDeleteDialog = false">ยกเลิก</v-btn>
                    <v-btn @click="deleteCourse(courseStore.currentCourse!.coursesId)" class="colorText">ยืนยันการลบรายวิชา
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
</style>