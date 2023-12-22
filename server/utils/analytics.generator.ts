import { Model, Types } from "mongoose";
import { IBorrowingHistory } from "../models/borrowHistory.model"; // Replace with the correct import

// Interface for the result
interface MonthlyBorrowData {
  month: string;
  booksBorrowed: number;
}

// Utility function to get monthly borrowing data for the last 12 months
export async function getMonthlyBorrowData(
  historyModel: Model<IBorrowingHistory>
): Promise<MonthlyBorrowData[]> {
  const currentDate = new Date();
  const monthlyData: MonthlyBorrowData[] = [];

  for (let i = 0; i < 12; i++) {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // Calculate the start and end dates for the current month
    const startDate = new Date(year, month - i, 1);
    const endDate = new Date(year, month - i + 1, 0);

    // Calculate the count of borrowed books for the current month
    const booksBorrowed = await historyModel.countDocuments({
      borrowDate: { $gte: startDate, $lte: endDate },
    });

    // Format the month and add data to the result
    const monthName = startDate.toLocaleString("default", { month: "short" });
    monthlyData.push({ month: `${monthName} ${year}`, booksBorrowed });
  }

  return monthlyData;
}


// Interface for the result
interface WeeklyBorrowData {
  week: string;
  booksBorrowed: number;
}

// Utility function to get weekly borrowing data for the current month
export async function getWeeklyBorrowData(
  historyModel: Model<IBorrowingHistory>
): Promise<WeeklyBorrowData[]> {
  const currentDate = new Date();
  const weeklyData: WeeklyBorrowData[] = [];
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  for (let i = 0; i < 5; i++) {
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - i * 7);
    startOfWeek.setHours(0, 0, 0, 0);
    const startWeekYear = startOfWeek.getFullYear();
    const startWeekMonth = startOfWeek.getMonth();

    // Check if the week is in the same month as the current date
    if (startWeekYear === currentYear && startWeekMonth === currentMonth) {
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 7);
      const weekNumber = i + 1;

      const booksBorrowed = await historyModel.countDocuments({
        borrowDate: { $gte: startOfWeek, $lt: endOfWeek },
      });

      weeklyData.push({
        week: `Week ${weekNumber}`,
        booksBorrowed,
      });
    }
  }

  return weeklyData;
}
