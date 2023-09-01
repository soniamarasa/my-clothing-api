import express from 'express';
import {
  getCategories,
  newCategory,
  updateCategory,
  deleteCategory,
} from '../services/categoryService.js';
import { authorization } from '../services/userService.js';

const categoriesRouter = express.Router();

categoriesRouter.get('/categories', authorization, getCategories); 
categoriesRouter.post('/categories', authorization, newCategory);
categoriesRouter.put('/categories/:id', authorization, updateCategory);
categoriesRouter.delete('/categories/:id', authorization, deleteCategory);

export default categoriesRouter;
