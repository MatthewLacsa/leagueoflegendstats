import express from "express"
import { getInfo, getMatchesInfo, login, logout, signup } from "../controllers/account.controller.js";

const router = express.Router()
//routes for account info
router.get("/info", getInfo)
router.get("/matches", getMatchesInfo)
router.post("/signup", signup)
router.post("/login", login)
router.post("/logout", logout)

export default router;