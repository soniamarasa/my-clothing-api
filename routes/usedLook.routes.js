import express from 'express';
import {
  getUsedLooks,
  newUsedLook,
  updateUsedLook,
  deleteUsedLook,
} from '../services/usedLookService.js';
import { authorization } from '../services/userService.js';

const usedLooksRouter = express.Router();

usedLooksRouter.get('/usedLooks', authorization, getUsedLooks); 
usedLooksRouter.post('/usedLooks', authorization, newUsedLook);
usedLooksRouter.put('/usedLooks/:id', authorization, updateUsedLook);
usedLooksRouter.delete('/usedLooks/:id', authorization, deleteUsedLook);

export default usedLooksRouter;
