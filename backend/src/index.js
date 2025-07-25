import cookieParser from "cookie-parser";
import accountRoutes from "./routes/account.route.js"
import express from "express"
import { connectDB } from "../lib/db.js";
import dotenv from "dotenv"

dotenv.config();

const app = express();

app.use(express.json());
//parse cookies
app.use(cookieParser);
//routes to be used
app.use("/api/account", accountRoutes)

app.listen(5001, () => {
    console.log("backend listening on port 5001")
    connectDB();
})