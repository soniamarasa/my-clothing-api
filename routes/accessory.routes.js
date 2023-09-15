import express from 'express';
import {
  getAccessories,
  newAccessory,
  updateAccessory,
  deleteAccessory,
} from '../services/accessoryService.js';
import { authorization } from '../services/userService.js';

const accessoryRouter = express.Router();

accessoryRouter.get('/accessories', authorization, getAccessories); 
accessoryRouter.post('/accessories', authorization, newAccessory);
accessoryRouter.put('/accessories/:id', authorization, updateAccessory);
accessoryRouter.delete('/accessories/:id', authorization, deleteAccessory);

export default accessoryRouter;
