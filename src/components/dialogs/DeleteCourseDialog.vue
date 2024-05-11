<script lang="ts" setup>
import { useCourseStore } from "@/stores/course.store";
import CreateCourseDialog2 from "./CreateCourseDialog2.vue";
const courseStore = useCourseStore();



</script>

<template>
    <v-container>
        <v-row justify="center">
            <v-card>
                <v-card-title>ต้องการลบรายวิชา  หรือไม่</v-card-title>
                <v-card-actions class="actions">
                    <v-btn @click="courseStore.showDeleteDialog = false">ยกเลิก</v-btn>
                    <v-btn class="colorText">ยืนยันการลบรายวิชา
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