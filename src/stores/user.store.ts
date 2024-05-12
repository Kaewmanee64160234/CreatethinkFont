// src/stores/user.ts
import { defineStore } from "pinia";
import { getCurrentInstance, ref, watch } from "vue";
import userService  from "@/services/user"; // Import the userService module
import { User } from "./types/User";
export const useUserStore = defineStore("userStore", () => {
    const users = ref<User[]>([]);
    const showDialog = ref(false);
    const showDialog2 = ref(false);
    const showDialog3 = ref(false);
    const showDeleteDialog = ref(false);
    const showEditDialog = ref(false);
    const keyword = ref('');
    const currentUser= ref<User>();
    const editUser = ref<User & { files: File[] }>({
        firstName: '',
        lastName: '',
        email: '',
        studentId: '',
        role: '',
        status: '',
        imageProfile: "",
        files: [],
    })
    const getUsers = async () => {
        try {
            const res = await userService.getUser();
            users.value = res.data;
        } catch (e) {
            console.log(e);
        }
    };   
    function resetUser() {
        editUser.value = {
            studentId: '',
            firstName: '',
            email: '',
            lastName: '',
            role: '',
            status: '',
            imageProfile: "",
            files: [],
        };
    }
    //save user
    const saveUser = async () => {
        try {
            await userService.saveUser(editUser.value);
            getUsers();
            closeDialog();
        } catch (e) {
            console.log(e);
        }
    };
    //delete user by id
    const deleteUser = async (id: number) => {
        try {
            await userService.deleteUser(id);
            await getUsers();
        } catch (e) {
            console.log(e);
        }
    };

    //get user by studentId
    const getUserBystidId = async (studentId: string) => {
        try {
            const res = await userService.findUserBystdId(studentId);
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
      showEditDialog.value = false;
    };
    return { currentUser, keyword, showEditDialog, users, getUsers, showDeleteDialog, showDialog, showDialog2, closeDialog, showDialog3, editUser, saveUser, deleteUser, resetUser, getUserBystidId };
  });
  

