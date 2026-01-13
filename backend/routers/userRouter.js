/* */

import express from 'express';
import { createUser, getUsers, getUserById, updateUser,deleteUser, loginUser, registerUser, restoreUser, logoutUser } from "../controllers/userController.js";
// import verifyAccessToken from '../middleware/authMiddleware.js';
import { verifyAccessToken } from '../middleware/verifyToken.js';
const router = express.Router();

router.post('/', createUser);
router.get("/", getUsers);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.post("/login", loginUser);
router.post("/register", registerUser);
router.get("/me", verifyAccessToken, restoreUser);
router.get("/:id", getUserById);
router.post("/logout", verifyAccessToken, logoutUser);



export default router;