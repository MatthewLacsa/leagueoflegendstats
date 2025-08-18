import cookieParser from "cookie-parser";
import accountRoutes from "./routes/account.route.js"
import detailRoutes from "./routes/riotdetails.route.js"
import express from "express"
import { connectDB } from "./lib/db.js";
import dotenv from "dotenv"
import cors from "cors"; 
dotenv.config();

const app = express();

app.use(cors({
            origin: "http://localhost:5173", 
            credentials: true
}));


app.use(express.json());
//parse cookies
app.use(cookieParser());
//routes to be used
app.use("/api/auth", accountRoutes)
app.use("/api/riotdetails", detailRoutes )


app.listen(5001, () => {
    console.log("backend listening on port 5001")
    connectDB();
})