import express from 'express';

const router = express.Router();

import {
    createBug
} from '../controllers/bugController.js';

router.post('/', createBug);

export default router;