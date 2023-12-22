import { CatchAsyncError } from "../middleware/catchAsyncHandler";
import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../utils/ErrorHandler";
import Member from "../models/members.model";
import ReturnHistory from "../models/returnHistory.model";
import BorrowingHistory from "../models/borrowHistory.model";
import mongoose from "mongoose";
import Book from "../models/books.model";

const MAX_BORROW_LIMIT = 5;
const DAYS_TO_RETURN = 4;

// Borrow a book
export const borrowBook = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const session = await mongoose.startSession();

    try {
      session.startTransaction();

      const memberId = req.user?._id;
      const { id } = req.params;

      const book = await Book.findById(id).session(session);
      if (!book) {
        return next({ message: "Book not found.", statusCode: 404 });
      }

      const member = await Member.findOne({ user: memberId }).session(session);
      if (!member) {
        return next({ message: "Member not found.", statusCode: 404 });
      }

      if (member.borrowedBooks.length >= MAX_BORROW_LIMIT) {
        return next({
          message: "Member has reached the maximum allowed borrowed books.",
          statusCode: 400,
        });
      }

      // One Book cannot be borrowed again
      if (
        member.borrowedBooks.some((bookId: any) => {
          return bookId.toString() === id;
        })
      ) {
        return next({
          message: "Member has already borrowed this book.",
          statusCode: 400,
        });
      }

      if (book.copiesAvailable <= 0) {
        return next({
          message: "No available copies of the book.",
          statusCode: 400,
        });
      }

      const borrowDate = new Date();

      const returnDate = new Date();
      returnDate.setDate(borrowDate.getDate() + DAYS_TO_RETURN);

      const borrowingHistory: any = new BorrowingHistory({
        user: memberId,
        book: id,
        borrowDate,
        returnDate,
        hasReturned: false,
      });

      member.borrowedBooks.push(id);
      book.copiesAvailable--;

      await borrowingHistory.save({ session });
      await member.save({ session });
      await book.save({ session });

      await session.commitTransaction();

      res
        .status(200)
        .json({ message: "Book borrowed successfully.", borrowingHistory });
    } catch (error: any) {
      await session.abortTransaction();
      return next(new ErrorHandler(error.message, 500));
    } finally {
      session.endSession();
    }
  }
);

// Return a Book
export const returnBook = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const memberId = req.user?._id;
      const { id } = req.params;

      // Chek if the book exists
      const book = await Book.findById(id).session(session);
      if (!book) {
        return next({ message: "Book not found.", statusCode: 404 });
      }

      // Check if the Person is a Member
      const member = await Member.findOne({ user: memberId }).session(session);
      if (!member) {
        return next({ message: "Member not found.", statusCode: 404 });
      }

      // Check if the member has the book to be returned
      const borrowedBookIndex = member.borrowedBooks.findIndex(
        (b: any) => b.toString() === id
      );

      if (borrowedBookIndex === -1) {
        return next({
          message: "The book is not currently borrowed by the member.",
          statusCode: 400,
        });
      }

      // Remove the book from the member's borrowed books
      member.borrowedBooks.splice(borrowedBookIndex, 1);

      // Update the book's available copies and return date
      book.copiesAvailable++;
      const returnDate = new Date();
      returnDate.setDate(returnDate.getDate() + 30);

      // Create a return history entry
      // const returnHistory = new ReturnHistory({
      //   user: memberId,
      //   book: id,
      //   returnDate,
      // });

      const borrowingHistoryEntry = await BorrowingHistory.findOne({
        user: memberId,
        book: id,
        hasReturned: false, // Assuming you only want to update if the book hasn't been returned already
      }).session(session);

      // if (!borrowingHistoryEntry) {
      //   return next({
      //     message: "No borrowing history entry found for the specified book and member.",
      //     statusCode: 404,
      //   });
      // }
      if (borrowingHistoryEntry) {
        // Update the hasReturned field to true
        borrowingHistoryEntry.hasReturned = true;

        // Save the changes to the borrowing history entry
        await borrowingHistoryEntry.save({ session });
      }

      // Save changes to the database within the transaction
      await member.save({ session });
      await book.save({ session });
      // await returnHistory.save({ session });

      await session.commitTransaction();
      res.status(200).json({ message: "Book returned successfully." });
    } catch (error: any) {
      await session.abortTransaction();
      return next(new ErrorHandler(error.message, 500));
    } finally {
      session.endSession();
    }
  }
);

// Get Borrow History of the current user
export const getBorrowHistory = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?._id; // Assuming you have user authentication in place

      if (!userId) {
        return next(new ErrorHandler("User not authenticated", 401));
      }

      const member = await Member.findOne({ user: userId });

      if (!member) {
        return next(new ErrorHandler("Member not found", 404));
      }

      // Retrieve the borrowing history for the current user
      const borrowHistory = await BorrowingHistory.find({
        user: userId,
      }).populate("book");

      res.status(200).json({ borrowHistory });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// Get Borrow History of a User --Admin
export const getBorrowHistoryAdmin = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.params.userId;

      // Retrieve the borrowing history for the specified user
      const borrowHistory = await BorrowingHistory.find({
        user: userId,
      }).populate("book");

      if (!borrowHistory || borrowHistory.length === 0) {
        return next(
          new ErrorHandler(
            "No borrow history found for the specified user",
            404
          )
        );
      }

      res.status(200).json({ borrowHistory });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);
