// src/stores/auth.ts
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAuthStore = defineStore('authStore', () =>{
  const currentStore = ref<UserProfile>();
  const setCurrentUser = (user: UserProfile) => {
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
