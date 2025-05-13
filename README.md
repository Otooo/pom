# POM - Gerenciador de Alocação de Atividades

O POM é um sistema de gerenciamento de atividades projetado para ajudar PEU a organizar e acompanhar atividades de companhias de forma eficiente. Ele fornece recursos para gerenciamento de tarefas e cronogramas de projetos.

## Estrutura do Projeto
backend/  
 ├── src/  
 │   ├── controllers/    # Controladores para cada entidade  
 │   ├── models/         # Definições de tipos/interfaces  
 │   ├── repositories/   # Acesso aos dados  
 │   ├── routes/         # Rotas da API  
 │   ├── services/       # Lógica de negócios  
 │   ├── database/       # Gerenciamento do banco de dados JSON  
 │   └── utils/          # Funções utilitárias  
 ├── package.json  
 ├── tsconfig.json  
 └── .env  
  
frontend/  
 ├── public/  
 ├── src/  
 │   ├── assets/  
 │   ├── components/  
 │   │   ├── calendar/  
 │   │   ├── company/  
 │   │   ├── layout/  
 │   │   └── ui/  
 │   ├── router/  
 │   ├── stores/  
 │   ├── types/  
 │   ├── views/  
 │   ├── App.vue  
 │   └── main.ts  
 ├── .env  
 ├── package.json  
 ├── tailwind.config.js  
 └── tsconfig.json  
  
## Pré-requisitos
- Node.js (v16 or higher)
- npm or yarn
- Git

## Instruções de Configuração

1. Clone the repository:  
  ```bash
  git clone https://github.com/seu-usuario/pom.git
  cd pom
  ```

2. Instale as dependências para o backend:
  ```bash
  cd backend
  npm install
  npm run dev
  
  #O backend estará disponível em http://localhost:3000.
  ```

3. Instale as dependências para o frontend:
  ```bash
  cd ../frontend
  npm install
  npm run dev
  
  #O frontend estará disponível em http://localhost:5173.
  ``` 

## Funcionalidades Principais
- Gerenciamento de usuários
- Gerenciamento de empresas
- Gerenciamento de localizações
- Agendamento e visualização de calendário
- Interface responsiva com tema claro/escuro
## Tecnologias Utilizadas

### Backend
- Node.js e Express
- TypeScript
- Sistema de armazenamento baseado em JSON
- API RESTful

### Frontend
- Vue.js 3 com Composition API
- JavaScript
- Tailwind CSS para estilização
- PrimeVue para componentes de UI
- Pinia para gerenciamento de estado
- Vue Router para navegação