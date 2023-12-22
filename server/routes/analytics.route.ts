import express from "express";
import {
  getMonthlyBorrowAnalytics,
  getWeeklyBorrowAnalytics,
} from "../controllers/analytics.controller";
import { isAutheticated, authorizeRoles } from "../middleware/auth";

const router = express.Router();

// Get Data for months
router.get(
  "/analytics/borrow/monthly",
  isAutheticated,
  authorizeRoles("admin"),
  getMonthlyBorrowAnalytics
);

// Get Data for weeks
router.get(
  "/analytics/borrow/weekly",
  isAutheticated,
  authorizeRoles("admin"),
  getWeeklyBorrowAnalytics
);

export default router;
