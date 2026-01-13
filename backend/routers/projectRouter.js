import express from "express";
import { 
    createProject,
    getAllProjects
 } from "../controllers/projectController.js";
import { verifyAccessToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/", verifyAccessToken, createProject);
router.get('/', getAllProjects);

export default router;


