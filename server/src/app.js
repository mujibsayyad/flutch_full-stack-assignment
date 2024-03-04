import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";

const app = express();

app.use(helmet());

const whiteList = [
  "http://localhost:3000",
  "https://flutch-full-stack-assignment.vercel.app",
];

const corsOption = {
  origin: whiteList,
  credentials: true,
};

app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api", authRoutes);
app.use("/api", bookRoutes);

export default app;
