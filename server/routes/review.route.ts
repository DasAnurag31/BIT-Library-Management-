import express from "express";
import { isAutheticated, authorizeRoles } from "../middleware/auth";
import {
  addReview,
  updateReview,
  deleteReview,
  deleteReviewByMember,
  getAllReviewsForBook,
  getAllReviews
} from "../controllers/review.controller";

const router = express.Router();

// Get a review for a book -- User
router.get('/reviews', getAllReviews);

// Get a review for a book -- User
router.get('/books/:bookId/reviews', getAllReviewsForBook);

// Add a review for a book -- User
router.post("/books/:id/reviews", isAutheticated, addReview); //OK

// Update a review -- User
router.put("/books/:bookId/reviews/:reviewId", isAutheticated, updateReview); 

// Delete a review --User
router.delete('/reviews/:bookId/:reviewId',isAutheticated, deleteReviewByMember);

// Delete a review on a book by any user -- Admin
router.delete(
  "/books/:bookId/reviews/:reviewId",
  isAutheticated,
  authorizeRoles("admin"),
  deleteReview
);

export default router;
