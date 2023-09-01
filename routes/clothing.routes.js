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
clothingRouter.post('/clothing', authorization, newClothing);
clothingRouter.put('/clothing/:id', authorization, updateClothing);
clothingRouter.delete('/clothing/:id', authorization, deleteClothing);

export default clothingRouter;
