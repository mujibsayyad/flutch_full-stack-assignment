import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";

const app = express();

app.use(helmet());

const whiteList = ["http://localhost:3000"];

const corsOption = {
  origin: whiteList,
  credentials: true,
};

app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("hello");
});

export default app;
