import express from 'express';


import {
    createTeam,getAllTeams
} from '../controllers/teamController.js';


const router = express.Router();

router.post('/', createTeam);
router.get('/', getAllTeams);

export default router;
