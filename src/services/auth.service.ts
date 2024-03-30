
import { User } from "@/stores/types/User";
import http from "./axios";
function login(user:User) {
  return http.post("/users/login", user);
}
export default { login };