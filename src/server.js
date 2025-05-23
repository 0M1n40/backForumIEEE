import { config } from "dotenv";
config()

import express from "express";
import cors from "cors";

import defaultRoutes from "./routes/default.js";
import protectedRoutes from "./routes/protected.js";
import accountRoutes from "./routes/account.js";
import questionRoutes from "./routes/questions.js";
import authRoutes from "./routes/auth.js";

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", defaultRoutes);
app.use("/api/duvidas", questionRoutes);

// Authentication Routes
app.use("/api/auth", authRoutes);

// Protected Routes

app.use("/api/conta", accountRoutes)
app.use("/api/admin", protectedRoutes)

app.listen(PORT, 
    () => console.log(`Server is running on port ${PORT}`))