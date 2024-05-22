import { defineStore } from "pinia";
import Attendance from "./types/Attendances";
import { ref } from "vue";
import attendaceService from "@/services/attendace.service";
export const useAttendanceStore = defineStore("attendanceStore", () => {
  const attendances = ref<Attendance[]>();
  const currentAttendance = ref<Attendance>();

  // create attendance
  const createAttendance = async (attendance: Attendance) => {
    try {
      const res = await attendaceService.createAttendance(attendance);
      if (res.status) {
        // console
      }
    } catch (error) {
      console.log(error);
    }
  };
  //get attendace by assigment id
  const getAttendanceByAssignmentId = async (id: string) => {
    try {
      const res = await attendaceService.getAttendanceByAssignmentId(id);
      attendances.value = res.data;
    } catch (e) {
      console.log(e);
    }
  };

  //get attdent by user id
  const getAttendanceByUserId = async (id: string) => {
    try {
      const res = await attendaceService.getAttendanceByUserId(id);
      attendances.value = res.data;
    } catch (e) {
      console.log(e);
    }
  };
  //update attendace
  const updateAttendance = async (attendance: Attendance) => {
    try {
      const res = await attendaceService.updateAttendance(attendance);
      if (res.status) {
        //console
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    attendances,
    currentAttendance,
    createAttendance,
    getAttendanceByAssignmentId,
    getAttendanceByUserId,
    updateAttendance
  };
});
