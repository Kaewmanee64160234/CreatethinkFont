<script lang="ts" setup>
import { useCourseStore } from "@/stores/course.store";
const courseStore = useCourseStore();


</script>

<template>
    <v-container>
        <v-row justify="center">
            <v-card style="width: 30vw;">
                <v-card-title style="margin-left: 3%;margin-top: 1%;">
                    <h2>ข้อมูลชั้นเรียน</h2>
                </v-card-title>
                <v-card variant="outlined" class="cards textarea">
                    <v-card-title>
                        <h3>รหัสห้องเรียน</h3>
                    </v-card-title>
                    <v-card-text>
                        <div >กลุ่มเรียน: </div>
                        <div >รหัสวิชา: </div>
                        <div >จำนวนหน่วยกิต: </div>
                        <div >จำนวนนักเรียน: </div>
                        <div >อาจารย์ผู้สอน: </div>
                        <div >เวลาเริ่มเรียนเลคเชอร์: </div>
                        <div >เวลาเลิกเรียนเลคเชอร์: </div>
                        <div >คะแนนเต็ม: </div>
                    </v-card-text>
                </v-card>
                <v-card-actions class="actions">
                    <v-btn >ยกเลิก</v-btn>
                    <v-btn class="colorText">เข้าร่วม</v-btn>
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