/* */

import express from 'express';
import { createUser, getUsers, getUserById, updateUser,deleteUser, loginUser, registerUser, restoreUser } from "../controllers/userController.js";
// import verifyAccessToken from '../middleware/authMiddleware.js';
import { verifyAccessToken } from '../middleware/verifyToken.js';
const router = express.Router();

router.post('/', createUser);
router.get("/", getUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.post("/login", loginUser);
router.post("/register", registerUser);
router.post("/me/:id", verifyAccessToken, restoreUser);


export default router;