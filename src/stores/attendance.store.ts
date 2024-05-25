import { defineStore } from "pinia";
import Attendance from "./types/Attendances";
import { ref } from "vue";
import attendaceService from "@/services/attendace.service";
import router from "@/router";
export const useAttendanceStore = defineStore("attendanceStore", () => {
  const attendances = ref<Attendance[]>();
  const currentAttendance = ref<Attendance &  { files: File[] }>({
    attendanceConfirmStatus: "", 
    attendanceDate: new Date(),
    attendanceId: 0,
    attendanceImage: "",
    attendanceStatus:'',
    files: []
  });

  // create attendance
  const createAttendance = async (attendance: Attendance,file:File) => {
    try {
      const res = await attendaceService.createAttendance(attendance,file);
      if (res!.status) {
        console.log(res!.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  //get attendace by assigment id
  const getAttendanceByAssignmentId = async (id:string) => {
    try {
      const response = await attendaceService.getAttendanceByAssignmentId(id);
      // Convert each attendance image data from buffer to base64 string
      const convertedData = response.data.map((attendance:any) => {
        if (attendance.attendanceImage && attendance.attendanceImage.data) {
          // Convert the numeric byte array to a character string and then to base64
          const base64String = btoa(
            String.fromCharCode(...new Uint8Array(attendance.attendanceImage.data))
          );
          // Assuming the image is JPEG
          attendance.attendanceImage = `data:image/jpeg;base64,${base64String}`;
        } else {
          // Handle cases where there is no image
          attendance.attendanceImage = null;
        }
        return attendance;
      });
  
      attendances.value = convertedData;
    } catch (e) {
      console.error("Failed to fetch attendances:", e);
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
        console.log(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const confirmAttendance = async (attendance: Attendance) => {
    try {
      const res = await attendaceService.updateAttendance(attendance);
      
   
    } catch (error) {
      // Log the error object which might contain additional info
      console.error('Error confirming attendance:', error);

      window.alert('An error occurred during confirmation');
    }
}

// getAttendanceByStatusInAssignment
  async function getAttendanceByStatusInAssignment(assignmentId: string) {
  try {
    const res = await attendaceService.getAttendanceByStatusInAssignment(assignmentId);
    console.log(res.data);
    const convertedData = res.data.map((attendance:any) => {
      if (attendance.attendanceImage && attendance.attendanceImage.data) {
        // Convert the numeric byte array to a character string and then to base64
        const base64String = btoa(
          String.fromCharCode(...new Uint8Array(attendance.attendanceImage.data))
        );
        // Assuming the image is JPEG
        attendance.attendanceImage = `data:image/jpeg;base64,${base64String}`;
      } else {
        // Handle cases where there is no image
        attendance.attendanceImage = null;
      }
      return attendance;
    });

    attendances.value = convertedData;
    
  } catch (error) {
    console.error('An error occurred during getAttendanceByStatusInAssignment:', error);
  }

}
  

  return {
    attendances,
    currentAttendance,
    createAttendance,
    getAttendanceByAssignmentId,
    getAttendanceByUserId,
    updateAttendance,
    confirmAttendance,
    getAttendanceByStatusInAssignment
    
  };
});
