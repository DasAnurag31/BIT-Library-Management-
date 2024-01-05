require("dotenv").config();
import express, { NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import { ErrorMiddleware } from "./middleware/error";

import userRouter from "./routes/user.route";
import bookRouter from "./routes/book.route";
import memberRouter from "./routes/member.route";
import reviewRouter from "./routes/review.route";
import transactionRouter from "./routes/transactions.route";
import notificationRouter from "./routes/notification.route";
import analyticsRouter from "./routes/analytics.route";

// express app
export const app = express();

// body Parser
app.use(express.json({ limit: "50mb" }));



// cookies Parser
app.use(cookieParser());

app.set("trust proxy", 1);
// cors and adding origin
app.use(cors({ origin: ["http://localhost:3000","http://localhost:5173","https://library-management-backend-ka15.onrender.com","https://dasanurag.live"], credentials: true }));

// testing route
app.get("/test", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    success: true,
    message: "API IS WORKING",
  });
});

// routers
app.use("/api/v1/", userRouter);
app.use("/api/v1/", bookRouter);
app.use("/api/v1/", memberRouter);
app.use("/api/v1/", reviewRouter);
app.use("/api/v1/", transactionRouter);
app.use("/api/v1/", notificationRouter);
app.use("/api/v1/", analyticsRouter);

// unknown routes
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`Route ${req.originalUrl} not found`) as any;
  err.statusCode = 404;
  next(err);
});

// Add error middleware
app.use(ErrorMiddleware);
