import express from "express"
import { login, logout, signup } from "../controllers/account.controller.js";

const router = express.Router()
//routes for account info
router.post("/signup", signup)
router.post("/login", login)
router.post("/logout", logout)
router.get("/check", protectRoute, checkAuth);
export default router;