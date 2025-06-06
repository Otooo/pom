// 1) Importa o electron-log
// const log = require('electron-log');

// // 2) Opcional: redireciona console.log e console.error para arquivos  
// //    e, simultaneamente, continua imprimindo no terminal para debug
// log.transports.file.level = 'info';   // níveis possíveis: 'info', 'warn', 'error', 'debug'
// log.transports.console.level = 'debug'; // mostra tudo no console também

// // Redireciona console.log / console.error para electron-log
// console.log = log.log;
// console.error = log.error;

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
    
    // 1) Em dev: __dirname aponta para a raiz do projeto
    //    Em prod: process.resourcesPath aponta para “…/pom/resources”
    const resourcesPath = process.resourcesPath;
    
    // 2a) Em PROD (asar = true + asarUnpack), o backend estará em:
    //    resources/app.asar.unpacked/backend/dist/index.js
    const unpackedPath = path.join(
        resourcesPath,
        'app.asar.unpacked',
        'backend',
        'dist',
        'index.js'
    );
    
    // 2b) Em PROD, caso não use asarUnpack, poderia estar em:
    //    resources/app/backend/dist/index.js
    const directPath = path.join(
        resourcesPath,
        'app',
        'backend',
        'dist',
        'index.js'
    );
    
    // 2c) Em DEV, __dirname + '/backend/dist/index.js'
    const devPath = path.join(__dirname, 'backend', 'dist', 'index.js');
    
    console.log('[startBackend] Checando paths:');

    let backendEntry;
    
    if (fs.existsSync(unpackedPath)) {
        console.log('[startBackend] Encontrado em unpackedPath');
        backendEntry = unpackedPath;
    } else if (fs.existsSync(directPath)) {
        console.log('[startBackend] Encontrado em directPath');
        backendEntry = directPath;
    } else if (fs.existsSync(devPath)) {
        console.log('[startBackend] Modo DEV: encontrado em devPath');
        backendEntry = devPath;
    } else {
        console.error('[startBackend] Arquivo não encontrado em nenhum path:');
        console.error(' →', unpackedPath);
        console.error(' →', directPath);
        console.error(' →', devPath);
        app.quit();
        return;
    }
    
    console.log('[startBackend] Iniciando backend em:', backendEntry);
    
    backendProcess = spawn(process.execPath, [backendEntry], {
        cwd: path.dirname(backendEntry),
        stdio: 'pipe'
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
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js')
        }
    });
    
    // 3) Em DEV, carrega de __dirname + '/frontend/dist/index.html'
    //    Em PROD, como empacotamos a pasta “frontend/dist” para dentro de “resources/app/frontend/dist”:
    const possibleDevFront = path.join(__dirname, 'frontend', 'dist', 'index.html');
    const possibleProdFront = path.join(
        process.resourcesPath,
        'app',
        'frontend',
        'dist',
        'index.html'
    );
    
    console.log('[createWindow] Checando front-ends:');
    
    let frontendEntry;
    if (fs.existsSync(possibleProdFront)) {
        console.log('[createWindow] Carregando front-end de PROD');
        frontendEntry = `file://${possibleProdFront}`;
    } else if (fs.existsSync(possibleDevFront)) {
        console.log('[createWindow] Carregando front-end de DEV');
        frontendEntry = `file://${possibleDevFront}`;
    } else {
        console.error('[createWindow] Frontend não encontrado em nenhum dos paths:');
        console.error(' →', possibleProdFront);
        console.error(' →', possibleDevFront);
        app.quit();
        return;
    }
    
    mainWindow.loadURL(frontendEntry);
    mainWindow.webContents.openDevTools();
    
    mainWindow.on('closed', () => {
        mainWindow = null;
        if (backendProcess) {
            backendProcess.kill();
            backendProcess = null;
        }
    });
}

// Quando o Electron estiver pronto, sobe o backend e depois a janela
app.whenReady().then(() => {
    startBackend();
    // Dá 500ms–1s para o Express subir antes de abrir a janela
    setTimeout(createWindow, 1000);
});

app.on('window-all-closed', () => {
    if (backendProcess) {
        backendProcess.kill();
        backendProcess = null;
    }
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

