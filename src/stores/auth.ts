// src/stores/auth.ts
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { User } from './types/User';

export const useAuthStore = defineStore('authStore', () =>{
  const currentStore = ref<User>();
  const setCurrentUser = (user: User) => {
    currentStore.value = user;
  };
  //fetchUserProfile
  const fetchUserProfile = () => {

    const response = fetch('localhost:3000/auth/profile').then((res) => res.json());
    console.log(response);

  }
  return {
    currentStore,
    setCurrentUser,
    fetchUserProfile
  };

});
