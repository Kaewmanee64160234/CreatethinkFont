// src/stores/course.store.ts
import { defineStore } from "pinia";
import { ref } from "vue";
import Course from "./types/Course";
import courseService from "@/services/course";

export const useCourseStore = defineStore("courseStore", () => {
  const courses = ref<Course[]>([]);
  const showDialog = ref(false);
  const showDialog2 = ref(false);
  const showDialog3 = ref(false);
  //get
  const getCourses = async () => {
    try {
      const res = await courseService.getCourse();
      courses.value = res.data;
    } catch (e) {
      console.log(e);
    }
  };

  const closeDialog = () => {
    showDialog.value = false;
    showDialog2.value = false;
    showDialog3.value = false;
  };
  return { courses, getCourses, showDialog, showDialog2, closeDialog, showDialog3};
});
