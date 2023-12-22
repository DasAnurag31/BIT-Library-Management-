import { Document, Schema, model, Types } from "mongoose";
import { IUser } from "./user.model";
import { IBook } from "./books.model";

// Interface
interface IReturnHistory extends Document {
  user: IUser;
  book: IBook;
  returnDate: Date;
}

// Mongoose Schema
const returnHistorySchema = new Schema<IReturnHistory & Document>({
  user: { type: Types.ObjectId, ref: "User", required: true },
  book: { type: Types.ObjectId, ref: "Book", required: true },
  returnDate: { type: Date, required: true },
});

const ReturnHistory = model<IReturnHistory & Document>(
  "ReturnHistory",
  returnHistorySchema
);

export default ReturnHistory;
