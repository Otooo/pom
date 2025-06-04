window.addEventListener('DOMContentLoaded', () => {
  // Define a URL da API do backend para o frontend
  // Get backend port from environment variable
  const backendPort = process.env.BACKEND_PORT || '9009';
  window.backendUrl = `http://localhost:${backendPort}/api`;
  
  // Você pode adicionar outras funções de utilidade aqui
  console.log('Preload script carregado');
});