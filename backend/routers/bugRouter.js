import express from 'express';

const router = express.Router();

import {
    createBug, getBugsByProjectId, updateBug, deleteBug, getBugById
} from '../controllers/bugController.js';
import { verifyAccessToken } from "../middleware/verifyToken.js";

router.post('/', verifyAccessToken, createBug);
router.get('/project/:projectId', getBugsByProjectId);
router.get('/:id', getBugById);
router.put('/:id', updateBug);
router.delete('/:id', deleteBug);
export default router;