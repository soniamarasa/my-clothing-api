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
accessoryRouter.post('/accessory', authorization, newAccessory);
accessoryRouter.put('/accessory/:id', authorization, updateAccessory);
accessoryRouter.delete('/accessory/:id', authorization, deleteAccessory);

export default accessoryRouter;
