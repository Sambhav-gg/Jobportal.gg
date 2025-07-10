import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.routes.js";
import companyRoute from "./routes/company.routes.js";
import jobRoute from "./routes/job.routes.js";
import applicationRoute from "./routes/application.route.js";
import path from "path";

dotenv.config();

const app = express();
const __dirname = path.resolve();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ✅ CORS Setup
const corsOptions = {
  origin: ["https://jobportal-gg-f1g2.onrender.com","http://localhost:5173"],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['set-cookie'],
  credentials: true, // ✅ Needed for cross-origin cookies!
};

app.use(cors(corsOptions));


// ✅ API Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

// ✅ Serve Frontend Build Files (optional for full-stack deployment on same server)
app.use(express.static(path.join(__dirname, "../frontend/dist")));

// ✅ Wildcard Route (for SPA frontend routing, uncomment if needed)
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend", "dist", "index.html"));
});

// ✅ Start Server
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    connectDB();
    console.log(`Server running at port ${PORT}`);
});
