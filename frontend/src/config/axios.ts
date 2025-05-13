import axios from 'axios';
import router from '@/router';

// Configuração global do Axios
axios.defaults.baseURL = 'http://localhost:3000/api';

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