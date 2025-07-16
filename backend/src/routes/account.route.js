import express from "express"
import { getInfo } from "../controllers/account.controller.js";
const router = express.Router()

router.get("/info", getInfo)

export default router;