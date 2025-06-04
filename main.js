const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { spawn } = require('child_process');
const url = require('url');
const fs = require('fs');

// Mantenha uma referência global do objeto window
// Se você não fizer isso, a janela será fechada automaticamente
// quando o objeto JavaScript for coletado pelo garbage collector
let mainWindow;
let backendProcess;

// Função para iniciar o servidor backend
function startBackend() {
  console.log('Iniciando o servidor backend...');
  
  // Caminho para o arquivo de entrada do backend compilado
  const backendPath = path.join(__dirname, 'backend', 'dist', 'index.js');
  
  // Inicia o processo do backend
  backendProcess = spawn('node', [backendPath], {
    stdio: 'pipe' // Captura saída para logs
  });
  
  // Log de saída do backend
  backendProcess.stdout.on('data', (data) => {
    console.log(`Backend: ${data}`);
  });
  
  backendProcess.stderr.on('data', (data) => {
    console.error(`Backend erro: ${data}`);
  });
  
  backendProcess.on('close', (code) => {
    console.log(`Backend processo encerrado com código ${code}`);
  });
}

// Função para criar a janela do aplicativo
function createWindow() {
  // Cria a janela do navegador
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true, // Permite integração com Node.js
      contextIsolation: false, // Desativa isolamento de contexto
      preload: path.join(__dirname, 'preload.js') // Script de pré-carregamento
    }
  });

  // Carrega o frontend
  const frontendPath = path.join(__dirname, 'frontend', 'dist', 'index.html');
  
  // Verifica se o arquivo existe
  if (fs.existsSync(frontendPath)) {
    mainWindow.loadURL(url.format({
      pathname: frontendPath,
      protocol: 'file:',
      slashes: true
    }));
  } else {
    console.error('Frontend não encontrado. Execute npm run build:frontend primeiro.');
    app.quit();
  }

  // Abre o DevTools em ambiente de desenvolvimento
  mainWindow.webContents.openDevTools();

  // Emitido quando a janela é fechada
  mainWindow.on('closed', function() {
    // Desreferencia o objeto da janela
    mainWindow = null;
    
    // Encerra o processo do backend quando a janela é fechada
    if (backendProcess) {
      backendProcess.kill();
      backendProcess = null;
    }
  });
}

// Este método será chamado quando o Electron terminar a inicialização
app.on('ready', () => {
  startBackend();
  
  // Aguarda um pouco para o backend iniciar antes de abrir a janela
  setTimeout(() => {
    createWindow();
  }, 1000);
});

// Sai quando todas as janelas estiverem fechadas
app.on('window-all-closed', function() {
  // No macOS é comum para aplicativos permanecerem ativos até que o usuário saia explicitamente
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function() {
  // No macOS é comum recriar uma janela quando o ícone da dock é clicado e não há outras janelas abertas
  if (mainWindow === null) {
    createWindow();
  }
});

// Limpa recursos antes de sair
app.on('before-quit', () => {
  if (backendProcess) {
    backendProcess.kill();
    backendProcess = null;
  }
});