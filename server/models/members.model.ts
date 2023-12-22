import { Document, Schema, model, Types } from "mongoose";
import { IUser } from "./user.model";
import { IBook } from "./books.model";

const MAX_LATE_FEE = 100;

interface IMember {
  user: IUser["_id"];
  borrowedBooks: IBook["_id"][];
  numberOfBooksBorrowed: number;
  lateFees: number;
}

const memberSchema = new Schema<IMember & Document>({
  user: { type: Types.ObjectId, ref: "User", required: true },
  borrowedBooks: [{ type: Types.ObjectId, ref: "Book" }],
  numberOfBooksBorrowed: {
    type: Number,
    default: 0,
  },
  lateFees: {
    type: Number,
    default: 0,
    max: MAX_LATE_FEE,
  },
});

// Pre-save hook to update the number of books borrowed
memberSchema.pre("save", function (next) {
  this.numberOfBooksBorrowed = this.borrowedBooks.length;
  next();
});

// Populate the 'user' field before returning the data
memberSchema.pre("find", function (next) {
  this.populate("user", "name email");
  next();
});

// Populate the 'user' field before returning a single document
memberSchema.pre("findOne", function (next) {
  this.populate("user", "name email");
  next();
});

const Member = model<IMember & Document>("Member", memberSchema);

export default Member;
