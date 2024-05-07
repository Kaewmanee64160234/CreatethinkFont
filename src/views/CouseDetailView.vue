<script setup lang="ts">
//get id from param
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useAssignmentStore } from '@/stores/assignment.store';
import Assignment from '@/stores/types/Assignment';
//import component CardAssigment
import CardAssigment from '@/components/assigment/CardAssigment.vue';
import { useCourseStore } from '@/stores/course.store';
import { useAuthStore } from '@/stores/auth';
const route = useRoute();
const id = ref(route.params.idCourse);
const tabs = [
    { id: 1, title: 'Posts' },
    { id: 2, title: 'Members' },

    { id: 3, title: 'Record' },
];
const headers = [
    { text: 'รหัสนักศึกษา', value: 'id', align: 'start' },
    { text: 'ชื่อ-นามสกุล', value: 'name' },
    { text: 'คะแนนเต็ม(%)', value: 'points' },
    { text: 'เช็คความถูกต้อง', value: 'isCorrect', sortable: false },
]
const students = [
    { id: '64160047', name: 'ฟาฟิศ ศิริรักษ์โกเมน', points: 100 ,isCorrect:true},
    { id: '64160048', name: 'กฤษณ์ กิจงานที่พึ่ง', points: 100 ,isCorrect:true},
    { id: '64160049', name: 'ปวงชน ปัญญามั่น', points: 100 ,isCorrect:false},]

const tab = ref('posts');
const posts = ref<Assignment[]>([]);
const assigmentStore = useAssignmentStore();
const courseStore = useCourseStore();
const showTextArea = ref(false);
const nameAssignment = ref('');
const authStore = useAuthStore();
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
    <div style="margin-top: 5%; margin-left: 5%;">
        <v-tabs v-model="tab">
            <v-tab v-for="item in tabs" :key="item.id" :value="item.title">
                {{ item.title }}
            </v-tab>
        </v-tabs>

        <v-container>
            <!-- Tab content for posts -->
            <v-tab-item v-if="tab === 'Posts'" value="Posts">
                <v-card class="mx-auto" color="primary" max-width="1200" outlined style="padding: 20px;">
                    <v-card-title>
                        <h1 class="text-h5">{{ courseStore.currentCourse?.nameCourses }}</h1>
                    </v-card-title>
                </v-card>

                <v-btn color="primary" @click="openPost" style="margin: 10px 0;">Create Post</v-btn>
                <!-- Conditional text area -->
                <v-card v-if="showTextArea" style="margin: 10px;">
                    <v-container>
                        <v-textarea v-model="nameAssignment" label="Enter your post" outlined></v-textarea>
                    </v-container>
                    <v-card-actions>
                        <!-- create button create and cancel -->
                        <v-spacer></v-spacer>
                        <v-btn color="error" @click="showTextArea = false">Cancel</v-btn>
                        <v-btn color="primary" @click="createPost()">Post</v-btn>
                    </v-card-actions>
                </v-card>

                <v-row>
                    <v-col cols="12" sm="12" md="12" v-for="post in posts" :key="post.assignmentId">
                        <CardAssigment :post="post"></CardAssigment>
                    </v-col>
                </v-row>
            </v-tab-item>

            <!-- Tab content for Members -->
            <v-tab-item v-else-if="tab === 'Members'" value="Members">
                <div style="width: 80%;">
                    <div>
                        <h3>Teacher</h3>

                        <v-table dense style="width: 80%; padding: 10px">
                            <template v-slot:default>
                                <tbody>
                                    <tr>
                                        <td><v-avatar color="primary" size="56"></v-avatar></td>
                                        <td> อาจารย์ วรวิทย์ วีระพัน</td>
                                    </tr>
                                </tbody>
                            </template>
                        </v-table>
                    </div>
                    <div>
                        <v-row style="width: 80%;">
                            <v-col cols="12" md="6">
                                <h3>Students</h3>
                            </v-col>
                            <v-col cols="12" md="6" style="text-align: end;">
                                <p> 72 Members</p>

                            </v-col>
                        </v-row>

                        <v-table dense style="width: 80%; padding: 10px">
                            <template v-slot:default>
                                <tbody>
                                    <tr v-for="(member, index) in authStore.gallery" :key="index">
                                        <td><v-avatar color="primary" size="56"></v-avatar></td>
                                        <td style="text-align: start;">{{ member.name }}</td>
                                    </tr>
                                </tbody>
                            </template>
                        </v-table>
                    </div>

                </div>

            </v-tab-item>

            <!-- Tab content for Assignments -->
            <v-tab-item v-else value="Record">
                <v-card class="mx-auto" color="primary" max-width="1200" outlined style="padding: 20px;">
                    <v-card-title>
                        <h1 class="text-h5">{{ courseStore.currentCourse?.nameCourses }}</h1>
                    </v-card-title>
                </v-card>
                <v-card class="my-3" style="width: 70%;">
                    <v-card-title>
                        Student Performance
                    </v-card-title>
                   <v-table>
                          <template v-slot:default>
                            <thead>
                                 <tr>
                                      <th class="text-left">ID</th>
                                      <th class="text-left">Name</th>
                                      <th class="text-left">Present</th>
                                      <th class="text-left">Absent</th>
                                 </tr>
                            </thead>
                            <tbody>
                                 <tr v-for="item in students" :key="item.id">
                                      <td>{{ item.id }}</td>
                                      <td>{{ item.name }}</td>
                                      <td>{{ item.points }}%</td>
                                      <td> <v-icon v-if="item.isCorrect == true" color="green">mdi-checkbox-marked-circle</v-icon> 
                                        <v-icon v-if="item.isCorrect == false" color="red">mdi-close-circle</v-icon></td>
                                 </tr>
                            </tbody>
                            </template>
                    </v-table>
                </v-card>
            </v-tab-item>

        </v-container>
    </div>
</template>

<style></style>