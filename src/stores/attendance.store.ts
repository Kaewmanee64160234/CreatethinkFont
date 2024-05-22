import { defineStore } from "pinia";
import Attendance from "./types/Attendances";
import { ref } from "vue";

export const useAttendanceStore = defineStore("attendanceStore", () => {

    const attendances = ref<Attendance[]>();
    const currentAttendance = ref<Attendance>();

    // const 

})