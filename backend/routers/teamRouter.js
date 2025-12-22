import express from 'express';


import {
    createTeam,
} from '../controllers/teamController.js';


const router = express.Router();

router.post('/', createTeam);

export default router;
