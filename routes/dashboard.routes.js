import express from 'express';
import { getDashboard } from '../services/dashboardService.js';
import { authorization } from '../services/userService.js';

const dashboardRouter = express.Router();

dashboardRouter.get('/dashboard', authorization, getDashboard);

export default dashboardRouter;
