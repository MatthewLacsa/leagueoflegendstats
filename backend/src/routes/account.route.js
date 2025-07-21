import express from "express"
import { getInfo, getMatchesInfo } from "../controllers/account.controller.js";

const router = express.Router()
//routes for account info
router.get("/info", getInfo)
router.get("/matches", getMatchesInfo)


export default router;