// src/stores/auth.ts
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as any | null, // Adjust the type as needed
  }),
  actions: {
    setUser(user: any) { // Adjust the type as needed
      this.user = user;
    },
    clearUser() {
      this.user = null;
    },
    async loginWithGoogle() {
      window.location.href = 'http://localhost:3000/auth/google';
    },
  },
});
