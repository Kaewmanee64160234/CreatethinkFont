// src/stores/user.ts
import { defineStore } from "pinia";
import { getCurrentInstance, ref, watch } from "vue";
import userService  from "@/services/user"; // Import the userService module
import { User } from "./types/User";
import user from "@/services/user";

export const useUserStore = defineStore("userStore", () => {
    const users = ref<User[]>([]);
    const showDialog = ref(false);
    const showDialog2 = ref(false);
    const showDialog3 = ref(false);
    const showDeleteDialog = ref(false);
    const showEditDialog = ref(false);
    const showEditDialog2 = ref(false);
    const keyword = ref('');
    const currentUser= ref<User>();
    const editUser = ref<User & { files: File[] }>({
        firstName: '',
        lastName: '',
        email: '',
        studentId: '',
        teacherId: '',
        role: '',
        status: '',
        profileImage: '',
        files: [],
    })

   
function mapToUser(data: any): User {
    // Prepare an array to hold all valid Float32Array descriptions
    const faceDescriptions: Float32Array[] = [];
  
    // We assume that there can be up to 4 face description fields
    for (let i = 1; i <= 4; i++) {
      const key = `faceDescription${i}`;
      if (data[key] && Array.isArray(data[key])) {
        faceDescriptions.push(new Float32Array(data[key]));
      }
    }
  
    return {
      userId: data.userId,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      role: data.role,
      status: data.status,
      studentId: data.studentId,
      teacherId: data.teacherId,
      faceDescriptions: faceDescriptions,
      picture: data.picture,
      profileImage: data.profileImage,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      
    };
  }
    
    const getUsers = async () => {
        try {
          const res = await userService.getUser(); // Fetch user data
          // Assuming res.data is an array of user objects
          console.log('res', res.data)
          users.value = res.data.map((user:any )=> mapToUser(user)); // Transform each user data
       console.log('users', users.value)
        } catch (e) {
          console.error("Failed to fetch users:", e);
        }
      };
    function resetUser() {
        editUser.value = {
            studentId: '',
            teacherId: '',
            firstName: '',
            email: '',
            lastName: '',
            role: '',
            status: '',
            profileImage: '',
            files: [],
        };
    }
    //save user
    const saveUser = async () => {
        try {
            console.log('save user', editUser.value)
            if (editUser.value.userId && editUser.value.userId !== 0) {
                await userService.updateUser(editUser.value, editUser.value.userId);
            } else {
                await userService.saveUser(editUser.value);
            }
            getUsers(); // Refresh or reload user list
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

    //get user by studentId and teacherId
    const getUserBystidId = async (studentId: string, teacherId: string) => {
        try {
            const res = await userService.getUserBystidId(studentId, teacherId);
            currentUser.value = res.data;
        } catch (e) {
            console.log(e);
        }
    };

    //get user image by id
    const getUserImage = async (id: number) => {
        try {
            const res = await userService.getUserImage(id);
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
      showEditDialog2.value = false;
    };
    return { currentUser, getUserImage, showEditDialog2, keyword, showEditDialog, users, getUsers, showDeleteDialog, showDialog, showDialog2, closeDialog, showDialog3, editUser, saveUser, deleteUser, resetUser, getUserBystidId };

  });
  
