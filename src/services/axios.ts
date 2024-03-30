//create  http axios
import axios from "axios";
import router from "@/router";

const instance = axios.create({
  baseURL: "http://localhost:3000",
});



export default instance;
