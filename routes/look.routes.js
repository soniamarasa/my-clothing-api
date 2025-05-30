import express from 'express';
import {
  getLooks,
  newLook,
  updateLook,
  deleteLook,
  getUnusedLooks
} from '../services/lookService.js';
import { authorization } from '../services/userService.js';

const looksRouter = express.Router();

looksRouter.get('/looks', authorization, getLooks); 
looksRouter.post('/looks', authorization, newLook);
looksRouter.put('/looks/:id', authorization, updateLook);
looksRouter.delete('/looks/:id', authorization, deleteLook);
looksRouter.get('/unused-looks', authorization, getUnusedLooks);

export default looksRouter;
