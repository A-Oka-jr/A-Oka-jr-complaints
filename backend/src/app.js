import express from "express";
import cors from "cors";
import authRouter from "../routes/auth.route.js";
import userRouter from "../routes/user.route.js";
import clientRouter from "../routes/client.route.js";
import complaintRouter from "../routes/complaint.route.js";
import cookieParser from "cookie-parser";
import path from "path";

const __dirname = path.resolve();

const app = express();

app.use(express.json());

app.use(cors());

app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/client", clientRouter);
app.use("/api/complaint", complaintRouter);

app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

export default app;
