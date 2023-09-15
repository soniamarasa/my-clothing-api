import express from 'express';
import {
  getHandbags,
  newHandbag,
  updateHandbag,
  deleteHandbag,
} from '../services/handbagService.js';
import { authorization } from '../services/userService.js';

const handbagRouter = express.Router();

handbagRouter.get('/handbags', authorization, getHandbags); 
handbagRouter.post('/handbags', authorization, newHandbag);
handbagRouter.put('/handbags/:id', authorization, updateHandbag);
handbagRouter.delete('/handbags/:id', authorization, deleteHandbag);

export default handbagRouter;
