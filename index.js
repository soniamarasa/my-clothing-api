import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

//Routes
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

dotenv.config();
const app = express();
const corsOptions = {
  origin: '*',
};

app.use(cors(corsOptions));
app.use(express.json());

const { DB_CONNECTION } = process.env;

mongoose
  .connect(DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
  .catch((error) => console.error('Erro na conexão MongoDB' + error));

mongoose.connection.once('open', () => {
  console.log('Conectado ao MongoDB');
  const APP_PORT = process.env.PORT;
  app.listen(APP_PORT, () => {
    console.log('Servidor foi iniciado na porta:' + APP_PORT);
  });
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
