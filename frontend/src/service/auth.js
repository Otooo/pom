import { useAuthStore } from '@/stores/auth';
import axios from 'axios';

/** VARs */
const API_PATH = '/users';
const authStore = useAuthStore();

/** METHODS */
export const login = async (login, password) => {
    try {
        const response = await axios.post(API_PATH + '/login', {
            login,
            password
        });

        authStore.login(response.data.user);

        return response.data;
    } catch (error) {
        authStore.user = null;
        authStore.isAuthenticated = false;
        throw error; 
    }
}
    
export const logout = () => {
    authStore.logout();
}
   
// Para o bypass de login
export const bypassLogin = () => {
    const user = {
        id: '#admin',
        name: 'Peum',
        login: 'Peumininodepapai',
        password: 'admin123',
    }
    
	return authStore.login(user);
}