import Notification from "../models/notification.model";
import { CatchAsyncError } from "../middleware/catchAsyncHandler";
import ErrorHandler from "../utils/ErrorHandler";
import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import {
  deleteOldReminders,
  deleteOldAnnouncements,
  sendReturnReminders,
} from "../services/notification.service";
import User from "../models/user.model";

// get all notification
export const getNotifications = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const notifications = await Notification.find().sort({
        createdAt: -1,
      });

      res.status(201).json({
        success: true,
        notifications,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// Update the Status of a notification to READ
export const updateNotification = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const session = await mongoose.startSession();

    try {
      session.startTransaction();

      const notification = await Notification.findById(req.params.id).session(
        session
      );

      if (!notification) {
        return next(new ErrorHandler("Notification not found", 404));
      } else {
        notification.status = "read";

        await notification.save({ session });

        const notifications = await Notification.find().sort({ createdAt: -1 });

        await session.commitTransaction();

        res.status(201).json({
          success: true,
          notification,
        });
      }
    } catch (error: any) {
      await session.abortTransaction();
      return next(new ErrorHandler(error.message, 400));
    } finally {
      session.endSession();
    }
  }
);

// Send Announcements to all Users
export const sendAnnouncement = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const session = await mongoose.startSession();

    try {
      session.startTransaction();

      const { message } = req.body; // Get the announcement title and message from the request

      const adminUser = await User.findOne({ role: "admin" });

      if (!adminUser) {
        throw new Error("No admin user found.");
      }

      const allUsers = await User.find();

      // Create and send the announcement to all users
      for (const user of allUsers) {
        await Notification.create({
          sender: adminUser._id,
          recipient: user._id,
          title: "Announcement",
          message,
          status: "unread",
        });
      }

      await session.commitTransaction();

      res.status(201).json({
        success: true,
      });
    } catch (error: any) {
      await session.abortTransaction();
      return next(new ErrorHandler(error.message, 400));
    } finally {
      session.endSession();
    }
  }
);

// Get all notifications of a particular user
export const getUserNotifications = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?._id; // Get the current user's ID (assuming you have this set in your authentication middleware)

      if (!userId) {
        return next(new ErrorHandler("User ID not found in the request.", 400));
      }

      const userNotifications = await Notification.find({
        recipient: userId, // Find notifications where the recipient is the current user
      }).sort({ createdAt: -1 });

      res.status(201).json({
        success: true,
        notifications: userNotifications,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// Delete Old Announcements
deleteOldAnnouncements.start();

// Delete Old Reminders
deleteOldReminders.start();

// Send Reminders for Returning Books
sendReturnReminders.start();
