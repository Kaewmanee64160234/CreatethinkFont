// src/stores/user.ts
import { defineStore } from "pinia";
import { ref } from "vue";
import userService  from "@/services/user"; // Import the userService module
import { User } from "./types/User";
export const useUserStore = defineStore("userStore", () => {
    const users = ref<User[]>([]);
    const showDialog = ref(false);
    const showDialog2 = ref(false);
    const showDialog3 = ref(false);
    const currentUser= ref<User>();
    const getUsers = async () => {
        try {
            const res = await userService.getUser();
            users.value = res.data;
        } catch (e) {
            console.log(e);
        }
    };   
    const closeDialog = () => {
        showDialog.value = false;
        showDialog2.value = false;
        showDialog3.value = false;
      showDialog3.value = false;
    };


    return { currentUser, users, getUsers, showDialog, showDialog2, closeDialog, showDialog3};
  });
  

