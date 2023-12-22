import { Document, Schema, model, Types } from "mongoose";
import { IUser } from "./user.model"; // Import your user model if you have one

export interface INotification extends Document {
  sender: IUser["_id"];
  recipient: IUser["_id"];
  title: string;
  message: string;
  status: "read" | "unread";
}

const notificationSchema = new Schema<INotification>(
  {
    sender: { type: Types.ObjectId, ref: "User", required: true },
    recipient: { type: Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    message: { type: String, required: true },
    status: { type: String, default: "unread" },
  },
  { timestamps: true }
);

const Notification = model<INotification>("Notification", notificationSchema);

export default Notification;
