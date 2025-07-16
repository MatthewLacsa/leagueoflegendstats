import express from "express"
import { getInfo } from "../controllers/account.controller";
const router = express.Router()

router.get("/:summonerName", getInfo)

export default router;