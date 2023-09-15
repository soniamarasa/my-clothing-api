import express from 'express';
import {
  getClothes,
  newClothing,
  updateClothing,
  deleteClothing,
} from '../services/clothingService.js';
import { authorization } from '../services/userService.js';

const clothingRouter = express.Router();

clothingRouter.get('/clothes', authorization, getClothes);
clothingRouter.post('/clothes', authorization, newClothing);
clothingRouter.put('/clothes/:id', authorization, updateClothing);
clothingRouter.delete('/clothes/:id', authorization, deleteClothing);

export default clothingRouter;
