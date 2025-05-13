import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    isAuthenticated: false,
  }),
  
  actions: {
    login(user) {
		    
			this.user = user
			this.isAuthenticated = true;
        
			// Armazena no localStorage para persistência
			localStorage.setItem('user', JSON.stringify(user));
        
      return true;
    },
    
    logout() {
      this.user = null;
      this.isAuthenticated = false;
      localStorage.removeItem('user');
    },
    
    checkAuth() {
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        this.user = JSON.parse(savedUser);
        this.isAuthenticated = true;
      }

	    return this.isAuthenticated;
    },
  }

});
