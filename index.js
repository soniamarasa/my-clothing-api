import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import accessoryRouter from './routes/accessory.routes.js';
import bandanaRouter from './routes/bandana.routes.js';
import categoriesRouter from './routes/categories.routes.js';
import clothingRouter from './routes/clothing.routes.js';
import handbagRouter from './routes/handbag.routes.js';
import looksRouter from './routes/look.routes.js';
import placeRouter from './routes/place.routes.js';
import plannedLooksRouter from './routes/plannedLook.routes.js';
import shoeRouter from './routes/shoe.routes.js';
import tagsRouter from './routes/tag.routes.js';
import dashboardRouter from './routes/dashboard.routes.js';
import { ensureIndexes } from './db/indexes.js';
import {
  errorHandler,
  notFoundHandler,
} from './middleware/errorHandler.js';

dotenv.config();

const app = express();

const allowedOrigins = (process.env.CORS_ORIGINS || process.env.BASE_URL || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

const corsOptions = {
  origin(origin, callback) {
    if (!origin || allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
      callback(null, true);
      return;
    }

    callback(null, false);
  },
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '1mb' }));

app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    database:
      mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
  });
});

const DB_CONNECTION = process.env.DB_CONNECTION?.trim().replace(/^["']|["']$/g, '');
const APP_PORT = process.env.PORT?.trim() || 3001;

if (!DB_CONNECTION) {
  console.error('Erro: defina DB_CONNECTION no arquivo .env');
  process.exit(1);
}

mongoose.connection.on('error', (error) => {
  console.error('Erro na conexão MongoDB:', error.message);
});

mongoose
  .connect(DB_CONNECTION)
  .then(async () => {
    console.log('Conectado ao MongoDB');
    await ensureIndexes();
    app.listen(APP_PORT, () => {
      console.log(`Servidor foi iniciado na porta: ${APP_PORT}`);
    });
  })
  .catch((error) => {
    console.error('Erro na conexão MongoDB:', error.message);
    if (error.message.includes('querySrv ECONNREFUSED')) {
      console.error(
        'Dica: no Windows, troque mongodb+srv:// por mongodb:// (connection string padrão do Atlas). Veja .env.example'
      );
    }
    process.exit(1);
  });

app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', accessoryRouter);
app.use('/api', bandanaRouter);
app.use('/api', categoriesRouter);
app.use('/api', clothingRouter);
app.use('/api', handbagRouter);
app.use('/api', looksRouter);
app.use('/api', placeRouter);
app.use('/api', plannedLooksRouter);
app.use('/api', shoeRouter);
app.use('/api', tagsRouter);
app.use('/api', dashboardRouter);

app.use(notFoundHandler);
app.use(errorHandler);
