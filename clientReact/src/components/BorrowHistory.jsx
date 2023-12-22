import React from "react";
import { useQuery } from "@tanstack/react-query";
import { axiosApi } from "../api/axios";
import { BorrowHistoryTable } from "./Tables/BorrowHistoryTable";

const BorrowHistory = ({ userId }) => {
  const fetchData = async () => {
    try {
      const response = await axiosApi.get(`/borrow/history/${userId}`);
      return response?.data.borrowHistory;
    } catch (err) {
      console.log("Error in Data Fetching", err);
    }
  };
  // Data Fetching logic
  const { isPending, isError, isSuccess, data, error } = useQuery({
    queryKey: ["borrow"],
    queryFn: fetchData,
  });

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (isError) {
    console.log("Error in borrow history", error);
  }
  if (isSuccess) {
    console.log("Success in Fetching Borrow Data" + data[0].hasReturned);
  }

  return (
    <div>
      {isSuccess && (
        <div className="text-black overflow-x-scroll">
          <BorrowHistoryTable history={data} />
        </div>
      )}
    </div>
  );
};

export default BorrowHistory;
