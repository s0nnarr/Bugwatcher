import express from "express";
import { 
    createProject,
    getAllProjects,
    getProjectById,
    joinProject
 } from "../controllers/projectController.js";
import { verifyAccessToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/", verifyAccessToken, createProject);
router.get('/', getAllProjects);
router.get('/:id', getProjectById);
router.post('/:id/join', verifyAccessToken, joinProject);


export default router;


