import express from 'express';
import {
  getLooks,
  newLook,
  updateLook,
  deleteLook,
} from '../services/lookService.js';
import { authorization } from '../services/userService.js';

const lookRouter = express.Router();

lookRouter.get('/looks', authorization, getLooks); 
looksRouter.post('/looks', authorization, newLook);
looksRouter.put('/looks/:id', authorization, updateLook);
looksRouter.delete('/looks/:id', authorization, deleteLook);

export default lookRouter;
