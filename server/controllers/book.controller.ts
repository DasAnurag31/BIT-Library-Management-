import Book from "../models/books.model";
import { CatchAsyncError } from "../middleware/catchAsyncHandler";
import ErrorHandler from "../utils/ErrorHandler";
import { Request, Response, NextFunction } from "express";

// Get all Books
export const getBooks = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const books = await Book.find();

      if (books.length === 0) {
        return next({ message: "No books found.", statusCode: 404 });
      }

      res.status(200).json({ books });
    } catch (error: any) {
      return next({
        message: "An error occurred while fetching books.",
        statusCode: 500,
        error,
      });
    }
  }
);

// Get all Available Books
export const getAvailableBooks = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const books = await Book.find({ copiesAvailable: { $gt: 0 } });

      if (books.length === 0) {
        return next({ message: "No available books found.", statusCode: 404 });
      }

      res.status(200).json({ books });
    } catch (error: any) {
      return next({
        message: "An error occurred while fetching books.",
        statusCode: 500,
        error,
      });
    }
  }
);

// Get a Particular Book Detail
export const getBookById = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      // Find the book by ID
      const book = await Book.findById(id);

      if (!book) {
        return next({ message: "Book not found.", statusCode: 404 });
      }

      res.status(200).json({ book });
    } catch (error: any) {
      return next({
        message: "An error occurred while fetching book details.",
        statusCode: 500,
        error,
      });
    }
  }
);

// Add a Book --ADMIN ONLY
export const addBook = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        title,
        authors,
        ISBN,
        description,
        genre,
        copiesAvailable,
        totalCopies,
        publicationYear,
        publisher,
      } = req.body;

      const newBook = new Book({
        title,
        authors,
        ISBN,
        description,
        genre,
        copiesAvailable,
        totalCopies,
        publicationYear,
        publisher,
      });

      await newBook.save();

      res
        .status(201)
        .json({ message: "Book added successfully.", book: newBook });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// Update a Book --Admin ONLY
export const updateBook = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const updatedBookData = req.body;

      const updatedBook = await Book.findByIdAndUpdate(id, updatedBookData, {
        new: true,
      });

      if (!updatedBook) {
        return next({ message: "Book not found.", statusCode: 404 });
      }

      res
        .status(200)
        .json({ message: "Book updated successfully.", book: updatedBook });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// Remove a book --Admin ONLY
export const deleteBook = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const deletedBook = await Book.findByIdAndRemove(id);

      if (!deletedBook) {
        return next({ message: "Book not found.", statusCode: 404 });
      }

      res
        .status(200)
        .json({ message: "Book deleted successfully.", book: deletedBook });
    } catch (error: any) {
      return next({
        message: "An error occurred while deleting the book.",
        statusCode: 500,
        error,
      });
    }
  }
);