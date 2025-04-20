import express from "express";
import cors from "cors";
import router from "./routes/journal.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(express.json());

app.use(cors());

app.use("/api/journal", router);

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.listen(8000, () => {
    console.log("Server set up on port 8000");
});
