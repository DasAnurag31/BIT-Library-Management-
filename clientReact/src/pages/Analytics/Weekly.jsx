import React from "react";
import { useQuery } from "@tanstack/react-query";
import { axiosApi } from "../../api/axios";
import { useStateContext } from "../../context/ContextProvider";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const Weekly = () => {
  const { currentColor } = useStateContext();

  const fetchData = async () => {
    try {
      const response = await axiosApi.get("/analytics/borrow/weekly");
      return response?.data.monthlyBorrowData;
    } catch (err) {
      console.log("Error Fetching Data");
      return [];
    }
  };
  // Fetch Data
  const { isPending, isError, isSuccess, data, error } = useQuery({
    queryKey: ["weeklyAnalyticsData"],
    queryFn: fetchData,
  });

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  if (isSuccess) {
    console.log("Weekly Data Fetched");
  }

  return (
    <div
      className="mx-40 my-10 p-4  bg-gray-100 rounded-2xl dark:bg-slate-900"
      style={{
        boxShadow: "rgb(38, 57, 77) 0px 20px 30px -10px",
      }}
    >
      <h2
        className="text-4xl font-bold mb-2 px-4 py-2  "
        style={{ color: currentColor }}
      >
        Week wise Monthly Data
      </h2>
      <div className="">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="booksBorrowed" fill="#8884d8" />
        </BarChart>
      </div>
    </div>
  );
};

export default Weekly;
