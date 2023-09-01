import express from 'express';
import {
  getPlaces,
  newPlace,
  updatePlace,
  deletePlace,
} from '../services/placeService.js';
import { authorization } from '../services/userService.js';

const placesRouter = express.Router();

placesRouter.get('/places', authorization, getPlaces); 
placesRouter.post('/places', authorization, newPlace);
placesRouter.put('/places/:id', authorization, updatePlace);
placesRouter.delete('/places/:id', authorization, deletePlace);

export default placesRouter;
