import express from "express";
import { 
    createProject,
    getAllProjects,
    getProjectById
 } from "../controllers/projectController.js";
import { verifyAccessToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/", verifyAccessToken, createProject);
router.get('/', getAllProjects);
router.get('/:id', getProjectById);


export default router;


