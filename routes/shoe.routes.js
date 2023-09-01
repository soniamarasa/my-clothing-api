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
shoeRouter.post('/shoe', authorization, newShoe);
shoeRouter.put('/shoe/:id', authorization, updateShoe);
shoeRouter.delete('/shoe/:id', authorization, deleteShoe);

export default shoeRouter;
