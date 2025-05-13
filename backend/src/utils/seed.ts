import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const dbPath = path.join(__dirname, '..', 'data', 'database.json');

// Garantir que o diretório existe
if (!fs.existsSync(path.dirname(dbPath))) {
  fs.mkdirSync(path.dirname(dbPath), { recursive: true });
}

// Dados iniciais
const initialData = {
  users: [
    {
      id: uuidv4(),
      name: 'Administrador',
      login: 'admin',
      password: 'admin123'
    }
  ],
  companies: [
    {
      id: uuidv4(),
      name: 'Empresa A',
      location: 'São Paulo'
    },
    {
      id: uuidv4(),
      name: 'Empresa B',
      location: 'Rio de Janeiro'
    }
  ],
  locations: [
    {
      id: uuidv4(),
      name: 'São Paulo',
      address: 'Av. Paulista, 1000'
    },
    {
      id: uuidv4(),
      name: 'Rio de Janeiro',
      address: 'Av. Atlântica, 500'
    }
  ],
  schedules: []
};

// Escrever no arquivo
fs.writeFileSync(dbPath, JSON.stringify(initialData, null, 2));

console.log('Dados iniciais criados com sucesso!');