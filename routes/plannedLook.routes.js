import express from 'express';
import {
  getPlannedLooks,
  newPlannedLook,
  updatePlannedLook,
  deletePlannedLook,
} from '../services/plannedLookService.js';
import { authorization } from '../services/userService.js';

const plannedLooksRouter = express.Router();

plannedLooksRouter.get('/plannedLooks', authorization, getPlannedLooks); 
plannedLooksRouter.post('/plannedLooks', authorization, newPlannedLook);
plannedLooksRouter.put('/plannedLooks/:id', authorization, updatePlannedLook);
plannedLooksRouter.delete('/plannedLooks/:id', authorization, deletePlannedLook);

export default plannedLooksRouter;
