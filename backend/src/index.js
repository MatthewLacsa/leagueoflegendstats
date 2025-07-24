import accountRoutes from "./routes/account.route.js"
import express from "express"


const app = express()

require('dotenv').config();

app.use(express.json());

//routes to be used
app.use("/api/account", accountRoutes)

app.listen(5001, () => {
    console.log("backend listening on port 5001")
})