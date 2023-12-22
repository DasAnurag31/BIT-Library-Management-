import BorrowingHistory from "../models/borrowHistory.model";
import User from "../models/user.model";
import { CronJob } from "cron";
import Notification from "../models/notification.model";


//Delete the Notifications which are read and 30 days old
const job = new CronJob("0 0 0 * * *", async function () {
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    await Notification.deleteMany({
      status: "read",
      createdAt: { $lt: thirtyDaysAgo },
    });
  });
  
  //Original = "0 0 0 * * *"
  // "*/30 * * * * *" test for every 30 seconds
  
  // Send Notifications everyday to those users who's due date is less than 5 day's from the current date.
  export const sendReturnReminders = new CronJob("0 0 0 * * *", async function () {
    
    const currentDate = new Date();
    // Calculate the date 5 days from now
    const fiveDaysFromNow = new Date();
    fiveDaysFromNow.setDate(fiveDaysFromNow.getDate() + 5);
  
    try {
      // Find members with return dates less than 5 days away
      const membersToNotify = await BorrowingHistory.find({
        returnDate: { $gte: currentDate, $lte: fiveDaysFromNow },
      }).populate("user");
  
      for (const history of membersToNotify) {
        const adminUser = await User.findOne({ role: "admin" });
  
        if (!adminUser) {
          console.log("No admin user found.");
          return;
        }
  
        const userId = history.user._id;
        const notification = await Notification.create({
          sender: adminUser._id,
          recipient: userId,
          title: "Reminder",
          message: `You Have to Return a book`,
        });
        await notification.save();
        console.log("Notification Sent");
      }
    } catch (error) {
      console.error("Error sending return reminders:", error);
    }
  });
  
  // Delete Reminders which are 2 Days Old
  export const deleteOldReminders = new CronJob("0 0 0 * * *", async function () {

    //const twoMinutesAgo = new Date(Date.now() - 2 * 60 * 1000);
    const twoDaysAgo = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000);
  
    try {
      await Notification.deleteMany({
        title: "Reminder",
        createdAt: { $lt: twoDaysAgo },
      });
      console.log("Old reminders deleted");
    } catch (error) {
      console.error("Error deleting old reminders:", error);
    }
  });
  
  // Delete Announcements which are 2 Days Old
  export const deleteOldAnnouncements = new CronJob("0 0 0 * * *", async function () {
    try {
      const twoDaysAgo = new Date();
      twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
  
      await Notification.deleteMany({
        title: "Announcement", 
        createdAt: { $lt: twoDaysAgo },
      });
  
      console.log("Old announcements deleted.");
    } catch (error) {
      console.error("Error deleting old announcements:", error);
    }
  });