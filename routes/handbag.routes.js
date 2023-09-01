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
handbagRouter.post('/handbag', authorization, newHandbag);
handbagRouter.put('/handbag/:id', authorization, updateHandbag);
handbagRouter.delete('/handbag/:id', authorization, deleteHandbag);

export default handbagRouter;
