<script setup lang="ts">
//get id from param
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useAssignmentStore } from '@/stores/assignment.store';
const route = useRoute();
const id = ref(route.params.idCourse);

const assigmentStore = useAssignmentStore();
//mounted get assigment by course id
onMounted(async () => {
   await assigmentStore.getAssignmentByCourseId(id.value.toString());
})

</script>
<template >
    <div style="margin-left: 10%;margin-top: 15%;">
        {{ assigmentStore.assignments }}
       

        
    </div>
</template>

<style >
    
</style>