import axios from 'axios';
import router from '@/router';

// Configuração global do Axios
const {isElectron, backendUrl} = (window as any).electronAPI 

axios.defaults.baseURL = isElectron
	? backendUrl 
	// @ts-ignore
	: import.meta.env.VITE_API_BASE;
// axios.defaults.withCredentials = false;  

// Interceptor para tratar erros de autenticação
axios.interceptors.response.use(
	response => response,
	error => {
		if (error.response && error.response.status === 401) {
			// Redirecionar para login se receber um erro 401 (não autorizado)
			router.push('/login');
		}
		return Promise.reject(error);
	}
);

export default axios;