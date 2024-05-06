// assignmentService
import Assignment from "@/stores/types/Assignment";
import http from "./axios";
// getAssignment
function getAssignment() {
    return http.get("/assignments");
}
// getAssignmentById
function getAssignmentById(id:string) {
    return http.get(`/assignments/${id}`);
}
// createAssignment
function createAssignment(data:Assignment) {
    return http.post("/assignments", data);
}
//get Assignment by course id
function getAssignmentByCourseId(id:string) {
    return http.get(`/assignments/course/${id}`);
}

export default { getAssignment,createAssignment,getAssignmentById,getAssignmentByCourseId };