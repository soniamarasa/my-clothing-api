import express from 'express';
import {
  getTags,
  newTag,
  updateTag,
  deleteTag,
} from '../services/tagService.js';
import { authorization } from '../services/userService.js';

const tagsRouter = express.Router();

tagsRouter.get('/tags', authorization, getTags); 
tagsRouter.post('/tags', authorization, newTag);
tagsRouter.put('/tags/:id', authorization, updateTag);
tagsRouter.delete('/tags/:id', authorization, deleteTag);

export default tagsRouter;
