import express from 'express';
import { getDashboard, getNextPlannedLook } from '../services/dashboardService.js';
import { authorization } from '../services/userService.js';

const dashboardRouter = express.Router();

dashboardRouter.get('/dashboard', authorization, getDashboard);
dashboardRouter.get('/next-planned-look', authorization, getNextPlannedLook);

export default dashboardRouter;
