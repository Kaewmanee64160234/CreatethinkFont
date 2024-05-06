import { ref } from "vue";
import Assignment from "./types/Assignment";
import { defineStore } from "pinia";
import assignmentService from "@/services/assignment";

export const useAssignmentStore = defineStore("assignmentStore", () => {
  const assignments = ref<Assignment[]>([]);
  const assignment = ref<Assignment>();

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
      assignments.value = res.data;
    } catch (e) {
      console.log(e);
    }
  };

  return { assignments,getAssignmentByCourseId, getAssignments, assignment };
});
