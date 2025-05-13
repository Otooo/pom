import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { userRoutes } from './routes/userRoutes';
import { companyRoutes } from './routes/companyRoutes';
import { locationRoutes } from './routes/locationRoutes';
import { scheduleRoutes } from './routes/scheduleRoutes';

// Configuração do ambiente
dotenv.config();
const PORT = process.env.PORT || 3000;

// Inicialização do app
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
app.use('/api/users', userRoutes);
app.use('/api/companies', companyRoutes);
app.use('/api/locations', locationRoutes);
app.use('/api/schedules', scheduleRoutes);

// Rota de teste
app.get('/', (req, res) => {
  res.send('API do Calendário de Alocação funcionando!');
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});