// src/stores/course.store.ts
import { defineStore } from "pinia";
import { ref } from "vue";
import Course from "./types/Course";

export const useCourseStore = defineStore("courseStore", () => {
  const courses = ref<Course[]>([]);
  //get
  const getCourses = () => {
    return courses.value;
  };
  //set
  const setCourses = (coursesList: Course[]) => {
    courses.value = coursesList;
  };

  return { courses, getCourses, setCourses };
});
