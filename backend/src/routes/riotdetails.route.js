import express from "express"
import { getInfo, getMatchesInfo } from "../controllers/riotdetails.controller.js"

const router = express.Router();

router.get("/info", getInfo);
router.get("/matches", getMatchesInfo);

export default router;


