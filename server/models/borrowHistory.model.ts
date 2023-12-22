import { Document, Schema, model, Types } from "mongoose";
import { IUser } from "./user.model";
import { IBook } from "./books.model";

// Interface
export interface IBorrowingHistory extends Document {
  user: IUser["_id"];
  book: IBook["_id"];
  borrowDate: Date;
  returnDate: Date;
  hasReturned: boolean;
}

const borrowingHistorySchema = new Schema<IBorrowingHistory & Document>({
  user: { type: Types.ObjectId, ref: "User", required: true },
  book: { type: Types.ObjectId, ref: "Book", required: true },
  borrowDate: { type: Date, required: true },
  returnDate: { type: Date },
  hasReturned: { type: Boolean, default: false },
});

// Model
const BorrowingHistory = model<IBorrowingHistory & Document>(
  "BorrowingHistory",
  borrowingHistorySchema
);

export default BorrowingHistory;
