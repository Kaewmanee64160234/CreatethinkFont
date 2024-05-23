import Attendance from "@/stores/types/Attendances";
import http from "./axios";

//create function get All attendance
function getAttendance() {
  return http.get("/attendances");
}
//create function get attendance by id
function getAttendanceById(id: string) {
  return http.get(`/attendances/${id}`);
}

//create function create attendance

function createAttendance(data: Attendance,file:File) {
    const formData = new FormData();
    formData.append('attendanceDate', data.attendanceDate.toString());
    formData.append('attendanceStatus', data.attendanceStatus);
    formData.append('imageFile', file);
    formData.append('attendanceConfirmStatus', data.attendanceConfirmStatus);
    if(data.user){
        formData.append('userId', data.user?.userId!.toString());
    }
    formData.append('assignmentId', data.assignment!.assignmentId+'');
    return http.post('/attendances', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });


}

//create function get attendance by course id

function getAttendanceByCourseId(id: string) {
  return http.get(`/attendances/course/${id}`);
}

//create function get attendance by ass Assignment id

function getAttendanceByAssignmentId(id: string) {
  return http.get(`/attendances/assignments/${id}`);
}
// getAttendanceByUserId
function getAttendanceByUserId(userId: string) {
  return http.get(`/attendances/user/${userId}`);
}

// updateAttendance

function updateAttendance(attendance: Attendance) {

  return http.patch(`/attendances/${attendance.attendanceId}`,attendance);
}
// getAttendanceByStatusInAssignment

function getAttendanceByStatusInAssignment(assignmentId: string) {
  return http.get(`/attendances/assignments/status/${assignmentId}`);
}

export default {
  getAttendance,
  createAttendance,
  getAttendanceById,
  getAttendanceByCourseId,
  getAttendanceByAssignmentId,
  getAttendanceByUserId,
  updateAttendance,
  getAttendanceByStatusInAssignment
};
