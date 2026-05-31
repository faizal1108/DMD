import express from "express";
import {
  getNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
} from "../controllers/notificationController.js";

const router = express.Router();

router.get("/notifications", getNotifications);
router.patch("/notifications/read-all", markAllAsRead);
router.patch("/notifications/:id/read", markAsRead);
router.delete("/notifications/:id", deleteNotification);

export default router;
