import { Document, Schema, model, Types } from "mongoose";
import { IUser } from "./user.model";
import { IBook } from "./books.model";

export interface IComment extends Document {
  user: IUser['_id'];
  comment: string;
  commentReplies: IComment[];
}

export interface IReview extends Document {
  user: IUser['_id'];
  rating: number;
  comment: string;
  commentReplies?: IComment[];
  book: IBook['_id'];
}

const commentSchema = new Schema<IComment>({
  user: { type: Types.ObjectId, ref: "User", required: true },
  comment: { type: String, required: true },
  commentReplies: [Object],
});

const reviewSchema = new Schema<IReview>({
  user: { type: Types.ObjectId, ref: "User", required: true },
  book: { type: Types.ObjectId, ref: "Book", required: true },
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
  commentReplies: [commentSchema], 
});

// Create a new model for reviews
const Review = model<IReview>("Review", reviewSchema);
export default Review;