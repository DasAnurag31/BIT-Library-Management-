import mongoose from "mongoose";
import { CatchAsyncError } from "../middleware/catchAsyncHandler";
import ErrorHandler from "../utils/ErrorHandler";
import { Request, Response, NextFunction } from "express";
import Member from "../models/members.model";
import Book from "../models/books.model";
import Review from "../models/review.model";

// -- REVIEWS --
interface IAddReviewData {
  review: string;
  rating: number;
}

//Get all reviews
export const getAllReviews = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const reviews = await Review.find();

      if (!reviews) {
        return next(new ErrorHandler("No reviews found for the book", 404));
      }

      res.status(200).json({
        success: true,
        reviews,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// Get all Reviews of a Particular Book
export const getAllReviewsForBook = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { bookId } = req.params;
      const reviews = await Review.find({ book: bookId });

      if (!reviews) {
        return next(new ErrorHandler("No reviews found for the book", 404));
      }

      res.status(200).json({
        success: true,
        reviews,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// Add Review
export const addReview = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const { review, rating } = req.body as IAddReviewData;
      const userId = req.user?._id;
      const { id } = req.params;

      const book = await Book.findById(id).session(session);

      if (!book) {
        return next(new ErrorHandler("Book not found", 404));
      }

      const member = await Member.findOne({ user: userId }).session(session);
      if (!member) {
        return next(new ErrorHandler("Member not found", 404));
      }

      // Initialize the reviews array if it doesn't exist
      if (!book.reviews) {
        book.reviews = [];
      }

      // Create the review data
      const reviewData: any = new Review({
        user: userId,
        book: id,
        rating,
        comment: review,
        commentReplies: [],
      });

      // Add the review to the book's reviews
      book.reviews.push(reviewData);

      // Calculate the average of ratings received
      const totalRatings = book.reviews.reduce(
        (acc: any, rev: any) => acc + rev.rating,
        0
      );

      if(Number(totalRatings / book.reviews.length) > 5){
        return next(new ErrorHandler("Rating exeeds 5",400))
      }

      book.rating = Number(totalRatings / book.reviews.length);

      await book.save({ session });
      await reviewData.save({ session });

      // Commit the transaction
      await session.commitTransaction();

      res.status(200).json({
        success: true,
        book,
      });
    } catch (error: any) {
      await session.abortTransaction();
      return next(new ErrorHandler(error.message, 400));
    } finally {
      session.endSession();
    }
  }
);

// Update Review --Member Only
export const updateReview = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {}
);

// Delete Review --Member
export const deleteReviewByMember = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const { bookId, reviewId } = req.params;
      const userId = req.user?._id;

      const book = await Book.findById(bookId).session(session);

      if (!book) {
        return next(new ErrorHandler("Book not found", 404));
      }

      const review = await Review.findById(reviewId);

      if (!review) {
        return next(new ErrorHandler("Review not found", 404));
      }

      if (review.user.toString() !== userId.toString()) {
        return next(
          new ErrorHandler("You are not allowed to delete this review", 403)
        );
      }

      await Review.deleteOne({ _id: reviewId }); // Use deleteOne to remove the review
      const bookIndex = book.reviews.indexOf(reviewId);

      if (bookIndex !== -1) {
        book.reviews.splice(bookIndex, 1);
      }

      let totalRatings = 0;

      book.reviews.forEach((rev: any) => {
        totalRatings += rev.rating;
      });

      if (book.reviews.length > 0) {
        book.rating = totalRatings / book.reviews.length;
      }

      await book.save({ session });
      await session.commitTransaction();

      res.status(200).json({ message: "Review deleted successfully" });
    } catch (error: any) {
      await session.abortTransaction();
      return next(new ErrorHandler(error.message, 400));
    } finally {
      session.endSession();
    }
  }
);

// Delete Review --Only Admin
export const deleteReview = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { bookId, reviewId } = req.params;

      // Find the book associated with the review
      const book = await Book.findById(bookId);

      if (!book) {
        return next({
          message: "Book not found.",
          statusCode: 404,
        });
      }

      // Find the review and its index in the book's reviews
      const reviewIndex = book.reviews.findIndex(
        (review: any) => review._id.toString() === reviewId
      );

      if (reviewIndex === -1) {
        return next({
          message: "Review not found.",
          statusCode: 404,
        });
      }

      // Remove the review from the book's reviews
      book.reviews.splice(reviewIndex, 1);

      // Save the updated book
      await book.save();

      res.status(200).json({ message: "Review deleted successfully." });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);
