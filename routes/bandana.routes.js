import express from 'express';
import {
  getBandanas,
  newBandana,
  updateBandana,
  deleteBandana,
} from '../services/bandanaService.js';
import { authorization } from '../services/userService.js';

const bandanaRouter = express.Router();

bandanaRouter.get('/bandanas', authorization, getBandanas); 
bandanaRouter.post('/bandana', authorization, newBandana);
bandanaRouter.put('/bandana/:id', authorization, updateBandana);
bandanaRouter.delete('/bandana/:id', authorization, deleteBandana);

export default bandanaRouter;
