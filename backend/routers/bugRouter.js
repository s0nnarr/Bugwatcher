import express from 'express';

const router = express.Router();

import {
    createBug,getBugsByProjectId, updateBug, deleteBug
} from '../controllers/bugController.js';

router.post('/', createBug);
router.get('/project/:projectId', getBugsByProjectId);
router.put('/:id', updateBug);
router.delete('/:id', deleteBug);
export default router;