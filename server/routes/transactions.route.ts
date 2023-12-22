import express from "express";
import {
  borrowBook,
  returnBook,
  getBorrowHistory,
  getBorrowHistoryAdmin,
} from "../controllers/transaction.controller";
import { isAutheticated, authorizeRoles } from "../middleware/auth";

const router = express.Router();

// Borrow a book
router.post("/books/borrow/:id", isAutheticated, borrowBook); //OK

// Return a borrowed book
router.post("/books/return/:id", isAutheticated, returnBook); //OK

// Get Borrow History of the curernt user
router.get("/borrow/history", isAutheticated, getBorrowHistory); //OK

// Get Borrow History of any User
router.get(
  "/borrow/history/:userId",
  isAutheticated,
  authorizeRoles("admin"),
  getBorrowHistoryAdmin
); //OK

export default router;
