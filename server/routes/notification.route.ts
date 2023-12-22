import express from "express";
import { authorizeRoles, isAutheticated } from "../middleware/auth";
import {
  getNotifications,
  updateNotification,
  sendAnnouncement,
  getUserNotifications,
} from "../controllers/notification.contrller";

const notificationRouter = express.Router();

notificationRouter.get(
  "/notification/all",
  isAutheticated,
  authorizeRoles("admin"),
  getNotifications
);

notificationRouter.get(
  "/notification/me",
  isAutheticated,
  getUserNotifications
);

notificationRouter.put(
  "/notification/:id",
  isAutheticated,
  updateNotification
);

notificationRouter.post(
  "/announcement",
  isAutheticated,
  authorizeRoles("admin"),
  sendAnnouncement
);

export default notificationRouter;
