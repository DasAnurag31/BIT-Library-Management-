import { Document, Schema, model, Types } from "mongoose";
import { IReview } from "./review.model";

const ISBN_REGEX = /^[0-9]{13}$/;
const MAX_DESCRIPTION_LENGTH = 500;

function validatePublicationYear(value: number) {
  const currentYear = new Date().getFullYear();
  return value <= currentYear;
}

export interface IBook extends Document {
  title: string;
  authors: string[];
  ISBN: string;
  description: string;
  genre: string;
  copiesAvailable: number;
  totalCopies: number;
  publicationYear: number;
  publisher: string;
  rating?: number;
  reviews?: IReview['_id'];
}

const bookSchema = new Schema<IBook>(
  {
    // _id: Schema.Types.ObjectId,
    title: { type: String, required: true },
    authors: [{ type: String, required: true }],
    ISBN: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (isbn: string) => ISBN_REGEX.test(isbn),
        message: "ISBN must be a 13-digit number.",
      },
    },
    description: {
      type: String,
      required: true,
      maxlength: MAX_DESCRIPTION_LENGTH,
    },
    genre: { type: String, required: true },
    copiesAvailable: { type: Number, required: true },
    totalCopies: { type: Number, required: true },
    publicationYear: {
      type: Number,
      required: true,
      validate: {
        validator: validatePublicationYear,
        message: "Publication year cannot be in the future.",
      },
    },
    publisher: { type: String, required: true },
    rating: { type: Number },
    reviews: [{ type: Types.ObjectId, ref: "Review" }], // Reference the Review model
  },
  {
    timestamps: true,
  }
);

const Book = model<IBook>("Book", bookSchema);

export default Book;
