import express from 'express';


import {
    createTeam, getAllTeams, getMyTeam, inviteToTeam, leaveTeam
} from '../controllers/teamController.js';
import { verifyAccessToken } from '../middleware/verifyToken.js';


const router = express.Router();

router.post('/', verifyAccessToken, createTeam);
router.get('/', getAllTeams);
router.get('/my', verifyAccessToken, getMyTeam);
router.post('/invite', verifyAccessToken, inviteToTeam);
router.post('/leave', verifyAccessToken, leaveTeam);

export default router;
