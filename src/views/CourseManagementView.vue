<script lang="ts" setup>
import CreateCourseDialog from '@/components/dialogs/CreateCourseDialog.vue';
import DeleteCourseDialog from '@/components/dialogs/DeleteCourseDialog.vue';
import EditCourseDialog from '@/components/dialogs/EditCourseDialog.vue';
import { useCourseStore } from '@/stores/course.store';
import Course from '@/stores/types/Course';
import { onMounted, ref } from "vue";
import { useRouter } from 'vue-router';
const courseStore = useCourseStore();
const router = useRouter();

onMounted(() => {
    courseStore.getCourses();
})

//create function click and push to /courseDetail/:idCourse
const goToCourseDetail = (idCourse: string, course: Course) => {
    router.push(`/courseDetail/${idCourse}`);
    courseStore.currentCourse = course;
}

const showEditDialog = (course: Course) => {
    courseStore.showEditDialog = true;
    courseStore.editCourse = course;
    console.log('id course',courseStore.editCourse);
}

const showDeleteDialog = (course: Course) => {
    courseStore.showDeleteDialog = true;
    courseStore.currentCourse = course;
}

</script>
<template>
    <v-container>
        <v-row>
            <v-col cols="12" sm="6" md="4" v-for="(item, index) of courseStore.courses" :key="index">
                <v-card style="margin-left: 10%;margin-top: 15%;" @click="goToCourseDetail(item.coursesId, item)">
                    <v-img height="15vh"
                        src="https://img.freepik.com/free-vector/realist-illustration-room-interior_52683-64752.jpg?w=1060&t=st=1714843452~exp=1714844052~hmac=e767aadc96b291547ce66a82185eb5e078cac3c31f6ca29c677e54174e142dbb"
                        cover>
                        <v-card-title style="margin-top: 5%;">
                            <h1 class="text-white">{{ item.nameCourses }}</h1>
                        </v-card-title>
                        <v-menu offset-y>
                            <template #activator="{ props }">
                                <v-btn icon v-bind="props" class="ma-2"
                                    style="position: absolute; right: 0; top: 0; z-index: 2;">
                                    <v-icon>mdi-dots-vertical</v-icon>
                                </v-btn>
                            </template>
                            <v-list>
                                <v-list-item  @click="showEditDialog(item)">
                                    <v-list-item-title
                                    >Edit</v-list-item-title>
                                </v-list-item>
                                <v-list-item @click="showDeleteDialog(item)">
                                    <v-list-item-title>Delete</v-list-item-title>
                                </v-list-item>
                            </v-list>
                        </v-menu>
                        <v-dialog v-model="courseStore.showEditDialog" persistent>
                            <EditCourseDialog/>
                        </v-dialog>
                        <v-dialog v-model="courseStore.showDeleteDialog" persistent>
                            <DeleteCourseDialog/>
                        </v-dialog>
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
    <v-container class="container" fluid>
        <v-row align="center" justify="end">
            <v-col>
                <v-btn size="60" style="border-radius: 50%;" variant="outlined"
                    @click="courseStore.showCreateDialog = true">
                    <v-icon icon="mdi-plus" size="40"></v-icon>
                </v-btn>
                <v-dialog v-model="courseStore.showCreateDialog" persistent>
                    <CreateCourseDialog/>
                </v-dialog>
            </v-col>
        </v-row>
    </v-container>
</template>

<style scoped>
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