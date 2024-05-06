<script lang="ts" setup>
import CreateCourseDialog from '@/components/dialogs/CreateCourseDialog.vue';
import { useCourseStore } from '@/stores/course.store';
import { onMounted, ref} from "vue";
import { useRouter } from 'vue-router';
const courseStore = useCourseStore();
const router = useRouter();

onMounted(() => {
    courseStore.getCourses();
})

//create function click and push to /courseDetail/:idCourse
const goToCourseDetail = (idCourse: string) => {
    router.push(`/courseDetail/${idCourse}`);
}

</script>
<template>
    <v-container>
        <v-row>
            <v-col cols="4" v-for="(item, index) of courseStore.courses" :key="index">
                <v-card   style="margin-left: 10%;margin-top: 15%;" @click="goToCourseDetail(item.coursesId)">
                    <v-img height="15vh"
                        src="https://img.freepik.com/free-vector/realist-illustration-room-interior_52683-64752.jpg?w=1060&t=st=1714843452~exp=1714844052~hmac=e767aadc96b291547ce66a82185eb5e078cac3c31f6ca29c677e54174e142dbb"
                        cover>
                        <v-toolbar color="transparent">
                            <template v-slot:append>
                                <v-btn icon="mdi-dots-vertical" class="text-white"></v-btn>
                            </template>
                            <v-card-title style="margin-top: 5%;">
                                <h1 class="text-white">{{ item.nameCourses }}</h1>
                            </v-card-title>
                        </v-toolbar>
                    </v-img>
                    <v-avatar size="100" class="avatar">
                        <v-img src="https://cdn.vuetifyjs.com/images/john.png"></v-img>
                    </v-avatar>
                    <v-card-text>
                        <div class="text-body">กลุ่มเรียนที่ {{ item.session }}</div>
                        <div class="text-body">อาจารย์</div>
                        <div class="text-body">เวลาเรียน</div>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
    <v-container class="container">
        <v-row align="center" justify="end">
            <v-col cols="auto">
                <v-btn size="60" style="border-radius: 50%;" variant="outlined" @click="courseStore.showDialog = true">
                    <v-icon icon="mdi-plus" size="40"></v-icon>
                    <v-dialog v-model="courseStore.showDialog" persistent>
                        <CreateCourseDialog></CreateCourseDialog>
                    </v-dialog>
                </v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<style>
.container {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;
    height: 100vh;
}

.text-white {
    color: white;
}

.text-body {
    font-size: 1.25rem;
    margin-bottom: 2%;
}

.avatar {
    position: absolute;
    top: 50%;
    right: 0%;
    transform: translate(-50%, -50%);
}
</style>