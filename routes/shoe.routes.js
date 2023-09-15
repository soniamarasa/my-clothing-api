import express from 'express';
import {
  getShoes,
  newShoe,
  updateShoe,
  deleteShoe,
} from '../services/shoeService.js';
import { authorization } from '../services/userService.js';

const shoeRouter = express.Router();

shoeRouter.get('/shoes', authorization, getShoes); 
shoeRouter.post('/shoes', authorization, newShoe);
shoeRouter.put('/shoes/:id', authorization, updateShoe);
shoeRouter.delete('/shoes/:id', authorization, deleteShoe);

export default shoeRouter;
