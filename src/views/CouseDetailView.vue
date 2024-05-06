<script setup lang="ts">
//get id from param
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useAssignmentStore } from '@/stores/assignment.store';
import Assignment from '@/stores/types/Assignment';
//import component CardAssigment
import CardAssigment from '@/components/assigment/CardAssigment.vue';
import { useCourseStore } from '@/stores/course.store';
const route = useRoute();
const id = ref(route.params.idCourse);
const tabs = [
    { id: 1, title: 'Posts' },
    { id: 2, title: 'Assignments' },
    { id: 3, title: 'Members' },
];
const tab = ref('posts');
const posts = ref<Assignment[]>([]);
const assigmentStore = useAssignmentStore();
const courseStore = useCourseStore();
const showTextArea = ref(false);
const nameAssignment = ref('');
//mounted get assigment by course id
onMounted(async () => {
    await assigmentStore.getAssignmentByCourseId(id.value.toString());
    posts.value = assigmentStore.assignments;
})

const openPost = () => {
    showTextArea.value = !showTextArea.value;
};
//create Post
const createPost = async () => {
    if (nameAssignment.value === '') {
        return;
    }
    const newAssignment = {
        assignmentTime: new Date(), nameAssignment: nameAssignment.value, course: { ...courseStore.currentCourse! },
        assignmentId: 0,
        attdances: [],
        room: undefined,
        createdDate: undefined,
        updatedDate: undefined,
        deletedDate: undefined
    }

    await assigmentStore.createAssignment(newAssignment);
    nameAssignment.value = '';
    showTextArea.value = false;
    posts.value = assigmentStore.assignments;
}


</script>
<template>
    <div style="margin-top: 5%;margin-left: 5%;">
        <v-tabs v-model="tab">
            <v-tab v-for="item in tabs" :key="item.id" :value="item.title">
                {{ item.title }}
            </v-tab>
        </v-tabs>

        <v-container>
            <v-card class="mx-auto" color="primary" max-width="1200" outlined style="padding: 20px;">
                <v-card-title>
                    <h1 class="text-h5">{{ courseStore.currentCourse?.nameCourses }}</h1>
                </v-card-title>
            </v-card>

            <!-- Tab content for posts -->
            <v-tab-item value="posts">
                <v-btn color="primary" @click="openPost" style="margin: 10px 0;">Create Post</v-btn>
                <!-- Conditional text area -->
                <v-card v-if="showTextArea" style="margin: 10px;">
                    <v-container>
                        <v-textarea v-model="nameAssignment" label="Enter your post" outlined></v-textarea>

                    </v-container>
                    <v-card-actions>
                        <!-- create button create and cancle -->
                        <v-spacer></v-spacer>
                        <v-btn color="error" @click="showTextArea = false">Cancel</v-btn>

                        <v-btn color="primary" @click=createPost()>Post</v-btn>

                    </v-card-actions>
                </v-card>
                <v-row>
                    <v-col cols="12" sm="12" md="12" v-for="post in posts" :key="post.assignmentId">
                        <CardAssigment :post="post"></CardAssigment>
                    </v-col>
                </v-row>
            </v-tab-item>
        </v-container>
    </div>
</template>

<style></style>