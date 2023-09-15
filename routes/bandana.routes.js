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
bandanaRouter.post('/bandanas', authorization, newBandana);
bandanaRouter.put('/bandanas/:id', authorization, updateBandana);
bandanaRouter.delete('/bandanas/:id', authorization, deleteBandana);

export default bandanaRouter;
