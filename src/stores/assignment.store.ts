import { ref } from "vue";
import Assignment from "./types/Assignment";
import { defineStore } from "pinia";
import assignmentService from "@/services/assignment";

export const useAssignmentStore = defineStore("assignmentStore", () => {
  const assignments = ref<Assignment[]>([]);
  const assignment = ref<Assignment>();
  const currentAssignment = ref<Assignment>();


  //get
  const getAssignments = async () => {
    try {
      const res = await assignmentService.getAssignment();
      assignments.value = res.data;
    } catch (e) {
      console.log(e);
    }
  };
  //getAssignmentByCourseId
  const getAssignmentByCourseId = async (id: string) => {
    try {
      const res = await assignmentService.getAssignmentByCourseId(id);
      //map assignment
        assignments.value = res.data;
        console.log(id);
    } catch (e) {
      console.log(e);
    }
  };
  //create Assignment
  const createAssignment = async (data:Assignment) => {
    try {
      const res = await assignmentService.createAssignment(data);
      if (res.data) {
        assignment.value = res.data;
        console.log('assignment created', res.data);
        await getAssignmentByCourseId(data.course.coursesId);
      } else {
        alert('Error creating assignment');
      }
    } catch (e) {
      console.error('Error creating assignment:', e);
    }
  };

      // assignments.value.push(res.data);
   

  return {
    assignments,
    getAssignmentByCourseId,
    getAssignments,
    assignment,
    createAssignment,
    currentAssignment
  };
});
