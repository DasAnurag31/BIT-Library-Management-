import React from "react";
import { useQuery } from "@tanstack/react-query";
import { axiosApi } from "../../api/axios";
import AdminTable from "./AdminTable";

const Administrator = () => {
  // Fetch Data Function
  const fetchData = async () => {
    try {
      const response = await axiosApi.get("/users/administrators");
      return response.data.users;
    } catch (err) {
      console.log("Error in Data Fetching", err);
    }
  };

  // Data Fetching logic
  const { isPending, isError, isSuccess, data, error } = useQuery({
    queryKey: ["administrator"],
    queryFn: fetchData,
  });

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (isError) {
    alert("Error Fetching Admins");
  }
  if (isSuccess) {
    console.log("Success in Fetching Data");
  }

  return (
    <div>
      <div className="flex justify-center">
        {isSuccess && <AdminTable admins={data} />}
      </div>
    </div>
  );
};

export default Administrator;
