// src/services/AuthService.ts

import axios from 'axios';

const API_URL = 'http://localhost:3000/auth/'; // Adjust to your backend URL

class AuthService {
  loginWithGoogle() {
    window.location.href = `${API_URL}google`;
  }

  // Method to handle other auth-related functionalities
}

export default new AuthService();
