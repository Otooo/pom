import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { userRoutes } from './routes/userRoutes';
import { companyRoutes } from './routes/companyRoutes';
import { locationRoutes } from './routes/locationRoutes';
import { scheduleRoutes } from './routes/scheduleRoutes';

// Configuração do ambiente
dotenv.config();
const PORT = process.env.PORT || 9009;

// Inicialização do app
const app = express();

// Middlewares
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
}));
app.options('*', cors()); // <- isso é essencial para preflight!

app.use(express.json());

// Rotas
app.use('/api', userRoutes);
app.use('/api', companyRoutes);
app.use('/api', locationRoutes);
app.use('/api', scheduleRoutes);

// Rota raiz de “viva-voz”
app.get('/', (_req, res) => {
  res.send('API do Calendário de Alocação funcionando!');
});

// Só chama .listen() se for invocado como “node dist/index.js”
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
}

export default app;