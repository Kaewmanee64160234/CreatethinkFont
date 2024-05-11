<script lang="ts" setup>
import { useCourseStore } from "@/stores/course.store";
const courseStore = useCourseStore();


</script>

<template>
    <v-container>
        <v-row justify="center">
            <v-card style="width: 30vw;">
                <v-card-title style="margin-left: 3%;margin-top: 1%;">
                    <h2>เข้าร่วมชั้นเรียน</h2>
                </v-card-title>
                <v-card variant="outlined" class="cards textarea">
                    <v-card-title>
                        <h3>รหัสห้องเรียน</h3>
                        <p>สอบถามรหัสห้องเรียนจากอาจารย์ผู้สอน หลังจากนั้นให้กรอกลงในช่องด้านล่าง</p>
                        <v-text-field clearable label="รหัสห้องเรียน" variant="outlined"
                            class="colorText"></v-text-field>
                    </v-card-title>
                </v-card>
                <v-card-actions class="actions">
                    <v-btn >ยกเลิก</v-btn>
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

</style>