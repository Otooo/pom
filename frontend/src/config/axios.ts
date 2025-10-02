import Axios, { type AxiosInstance } from 'axios';
import router from '@/router';
import { useNotify } from '@/composables/useNotify';

type ApiWithFlag = AxiosInstance & { __interceptorsInstalled__?: boolean };
const g = globalThis as any;

const axios: ApiWithFlag =
  g.__API__ ??
  Axios.create({
    // @ts-ignore
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:9009',
  });

if (!g.__API__) g.__API__ = axios;

// // Configuração global do Axios
// // @ts-ignore
// axios.defaults.baseURL = import.meta.env.VITE_API_URL || 'http://localhost:9009';
// axios.defaults.withCredentials = false;  

// Instala os interceptors apenas uma vez
if (!axios.__interceptorsInstalled__) {
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

	axios.__interceptorsInstalled__ = true;
}

export default axios;