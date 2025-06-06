// preload.js
const { contextBridge } = require('electron');

window.addEventListener('DOMContentLoaded', () => {
  // 1) Define a porta do backend (padrão: 9009)
  const backendPort = process.env.BACKEND_PORT || '9009';

  // 2) Constrói a URL completa para as APIs
  const backendUrl = `http://localhost:${backendPort}/api`;

  // 3) Exponha um objeto global chamado `electronAPI` com os valores que o renderer pode acessar:
  contextBridge.exposeInMainWorld('electronAPI', {
    isElectron: true,
    backendUrl
  });

  console.log('[preload] exposeInMainWorld →', { isElectron: true, backendUrl });
});