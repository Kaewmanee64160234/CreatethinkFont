<script setup lang="ts">
//get id from param
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useAssignmentStore } from '@/stores/assignment.store';
import Assignment from '@/stores/types/Assignment';
//import component CardAssigment
import CardAssigment from '@/components/assigment/CardAssigment.vue';
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

//mounted get assigment by course id
onMounted(async () => {
    await assigmentStore.getAssignmentByCourseId(id.value.toString());
    posts.value = assigmentStore.assignments;
})

const createPost = () => {
    console.log('create post');
}



</script>
<template>
    <v-container>
        <v-tabs v-model="tab">
            <v-tab v-for="item in tabs" :key="item.id" :value="item.title">
                {{ item.title }}
            </v-tab>

        </v-tabs>

        <!-- Tab content for posts -->
        <v-tab-item value="posts">
            <v-btn color="primary" @click="createPost">Create Post</v-btn>
            <v-row>
                <v-col cols="12" sm="12" md="12" v-for="post in posts" :key="post.assignmentId">
                   <CardAssigment :post="post"></CardAssigment>
                </v-col>
            </v-row>
        </v-tab-item>
    </v-container>




</template>

<style></style>