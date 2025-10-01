import axios from 'axios';
import router from '@/router';
import { useNotify } from '@/composables/useNotify';

// Configuração global do Axios
// @ts-ignore
axios.defaults.baseURL = import.meta.env.VITE_API_URL || 'http://localhost:9009';
// axios.defaults.withCredentials = false;  

// Interceptor para tratar erros de autenticação
axios.interceptors.response.use(
	response => response,
	error => {
		if (error.response && error.response.status === 401) {
			// Redirecionar para login se receber um erro 401 (não autorizado)
			router.push('/login');
		}
		
		if (error.response && error.response.status === 500) {
			useNotify().errorToastWithLink(
				'Seu plano expirou, por favor, contate Miguel Reis para renovar: ',
				'https://api.whatsapp.com/send?phone=+5575991142248&text=Me mama',
				'Clique aqui para contatar Miguel Reis',
				8000
			);
		}

		return Promise.reject(error);
	}
);

export default axios;