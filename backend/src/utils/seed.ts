import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const dbPath = path.join(__dirname, '..', 'data', 'database.json');

// Garantir que o diretório existe
if (!fs.existsSync(path.dirname(dbPath))) {
  fs.mkdirSync(path.dirname(dbPath), { recursive: true });
}

const locations = [
  {
    id: uuidv4(),
    name: 'Stand Liberdade',
    address: 'Av. Paulista, 1000'
  },
  {
    id: uuidv4(),
    name: 'Stand Niteroi',
    address: 'Av. Atlântica, 500'
  }
];

const companies = [
  {
    id: uuidv4(),
    name: 'Empresa AA',
    location_id: locations[0].id // ID da localizaçã
  },
  {
    id: uuidv4(),
    name: 'Empresa BB',
    location_id: locations[1].id 
  }
]

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
  locations,
  companies,
  schedules: [
    {
      id: uuidv4(),
      date: '2025-05-22', // formato YYYY-MM-DD
      shift: 'morning',
      company_id: companies[0].id
    },
    {
      id: uuidv4(),
      date: '2025-05-23', // formato YYYY-MM-DD
      shift: 'morning',
      company_id: companies[0].id
    },
    {
      id: uuidv4(),
      date: '2025-05-24', // formato YYYY-MM-DD
      shift: 'morning',
      company_id: companies[0].id
    },
    {
      id: uuidv4(),
      date: '2025-05-23', // formato YYYY-MM-DD
      shift: 'afternoon',
      company_id: companies[1].id
    },
    {
      id: uuidv4(),
      date: '2025-05-25', // formato YYYY-MM-DD
      shift: 'night',
      company_id: companies[1].id
    },
  ]
};

// Escrever no arquivo
fs.writeFileSync(dbPath, JSON.stringify(initialData, null, 2));

console.log('Dados iniciais criados com sucesso!');