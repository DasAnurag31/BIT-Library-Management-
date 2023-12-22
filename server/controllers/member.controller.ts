import { CatchAsyncError } from "../middleware/catchAsyncHandler";
import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../utils/ErrorHandler";
import Member from "../models/members.model";
import User from "../models/user.model"; // Adjust the path based on your project structure
import { startSession } from "mongoose";
import mongoose from "mongoose";

// Make User a member
export const becomeMember = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.body.user?._id;

      // Check if the user is already a member
      const existingMember = await Member.findOne({ user: userId });

      if (existingMember) {
        return res.status(200).json({ message: "User is already a member." });
      }

      // Create a new member with no borrowed books
      const newMember = await Member.create({
        user: userId,
        borrowedBooks: [],
        lateFees: 0, // You can set this to any initial value
      });

      res
        .status(201)
        .json({ message: "User has become a member.", member: newMember });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// Get a Member by id 
export const getMemberById = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.params.userId;

      // Find the member associated with the user ID and populate the 'borrowedBooks' array with book details
      const member = await Member.findOne({ user: userId }).populate({
        path: "borrowedBooks",
        model: "Book",
        select: "ISBN title", // Select the fields you want to include
      });

      if (!member) {
        return next(new ErrorHandler("Member not found", 404));
      }

      res.status(200).json({ member });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// Delete Member
export const deleteMember = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.params.userId;

      // Find the member associated with the user ID
      const member = await Member.findOne({ user: userId });

      if (!member) {
        return next({
          message: "Member not found.",
          statusCode: 404,
        });
      }

      // Delete the member
      await Member.deleteOne({ user: userId });

      res.status(200).json({ message: "Member deleted successfully." });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// Get all users which are Students (Role = user)
export const getAllRegisteredStudents = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await User.find({ role: "user" });
      res.status(200).json({ users });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// Get a Registered Student by id
export const getStudentById = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const studentId = req.params.id; // Access the student ID from the path parameter

      // Find the student by ID in the database
      const student = await User.findOne({ _id: studentId, role: "user" });

      // Check if the student was found
      if (!student) {
        return next(new ErrorHandler("Student not found", 404));
      }

      // Send the student data in the response
      res.status(200).json({ student });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// Get all users which are Admins (Role = admin)
export const getAllAdminUsers = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await User.find({ role: "admin" });
      res.status(200).json({ users });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// After Verification, Make a student a Member
export const makeUserMember = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.userId;

    try {
      // Check if the user exists
      const user = await User.findById(userId);
      if (!user) {
        return next({
          message: "User not found.",
          statusCode: 404,
        });
      }

      // Check if the user is already a member
      const existingMember = await Member.findOne({ user: userId });
      if (existingMember) {
        return next({
          message: "User is already a member.",
          statusCode: 400,
        });
      }

      // Start a session
      const session = await startSession();
      session.startTransaction();

      try {
        // Find the user by ID and update the isVerified field
        await User.findByIdAndUpdate(userId, { isVerified: true }, { session });

        const userObjectId = new mongoose.Types.ObjectId(userId);
        // Create a new Member document and initialize it
        const member = new Member({
          user: userObjectId,
          borrowedBooks: [],
          numberOfBooksBorrowed: 0,
          lateFees: 0,
        });

        // Save the member document
        await member.save({ session });

        // Commit the transaction
        await session.commitTransaction();
        session.endSession();

        res.status(200).json({ message: "User successfully made a member." });
      } catch (error) {
        // Rollback the transaction if any error occurs
        await session.abortTransaction();
        session.endSession();
        throw error;
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// Find all the members
export const getAllMembers = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const members = await Member.find();

      res.status(200).json({ members });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);
