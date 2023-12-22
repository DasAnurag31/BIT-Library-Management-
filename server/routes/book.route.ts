import express from "express";
import {
  getBooks,
  getBookById,
  addBook,
  updateBook,
  deleteBook,
} from "../controllers/book.controller";
import { isAutheticated, authorizeRoles } from "../middleware/auth";

const router = express.Router();

// Get a list of available books
router.get("/books", getBooks); // OK

// Get book details by ID
router.get("/books/:id", getBookById); // OK

// Add a new book
router.post("/books", isAutheticated, authorizeRoles("admin"), addBook); // OK

// Update book details
router.put("/books/:id", isAutheticated, authorizeRoles("admin"), updateBook); //OK

// Delete a book
router.delete(
  "/books/:id",
  isAutheticated,
  authorizeRoles("admin"),
  deleteBook
); //OK

export default router;
