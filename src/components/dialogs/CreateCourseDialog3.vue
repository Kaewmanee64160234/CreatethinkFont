<script lang="ts" setup>
import { useCourseStore } from "@/stores/course.store";
import { ref } from "vue";
const courseStore = useCourseStore();

</script>

<template>
    <v-container>
        <v-row justify="center">
            <v-card style="width: 30vw;">
                <v-card-title style="margin-left: 3%;margin-top: 1%;">
                    <h2>เพิ่มรายชื่อนิสิต</h2>
                </v-card-title>
                <v-card variant="outlined" class="textarea" style="width: 27vw;">
                    <v-card-title>
                        <h3 style="margin-bottom: 2%;">สร้างรายละเอียดวิชา</h3>
                    </v-card-title>
                </v-card>
                <v-card-actions class="actions">
                    <v-btn @click="courseStore.closeDialog">ยกเลิก</v-btn>
                    <v-btn class="colorText">ต่อไป</v-btn>
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