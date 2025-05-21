import { config } from "dotenv";
config()

import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.js";
import protectedRoutes from "./routes/protected.js";

const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", authRoutes);

// Protected Routes

app.use("/api/admin", protectedRoutes)


app.listen(PORT, 
    () => console.log(`Server is running on port ${PORT}`))