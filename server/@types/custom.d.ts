import { Request } from "express";
import { IUser } from "../models/user.model";
import { IBook } from "../models/books.model";

// TO ACCESS REQ.USER
declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
    interface Request{
      book?:IBook;
    }
  }
}
