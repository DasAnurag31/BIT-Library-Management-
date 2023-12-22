import { Request, Response, NextFunction } from "express";
import {getMonthlyBorrowData, getWeeklyBorrowData} from "../utils/analytics.generator"
import { CatchAsyncError } from "../middleware/catchAsyncHandler";
import BorrowingHistory from "../models/borrowHistory.model";
import ErrorHandler from "../utils/ErrorHandler";

export const getMonthlyBorrowAnalytics = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const borrowData = await getMonthlyBorrowData(BorrowingHistory);

      res.status(200).json({
        success: true,
        monthlyBorrowData: borrowData,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

export const getWeeklyBorrowAnalytics = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const borrowData = await getWeeklyBorrowData(BorrowingHistory);
  
        res.status(200).json({
          success: true,
          monthlyBorrowData: borrowData,
        });
      } catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
      }
    }
  );