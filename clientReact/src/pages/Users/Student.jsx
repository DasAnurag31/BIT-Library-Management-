import React from "react";
import { useQuery } from "@tanstack/react-query";
import { axiosApi } from "../../api/axios";
import StudentTable from "./StudentTable";

const Student = () => {
  // Fetch Data Function
  const fetchData = async () => {
    try {
      const response = await axiosApi.get("/users/students");
      return response.data.users;
    } catch (err) {
      console.log("Error in Data Fetching", err);
    }
  };

  // Data Fetching logic
  const { isPending, isError, isSuccess, data, error } = useQuery({
    queryKey: ["student"],
    queryFn: fetchData,
  });

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (isError) {
    alert("Error in Fetching Students");
  }
  if (isSuccess) {
    console.log("Success in Fetching Data");
  }

  return (
    <div>
      <div className="flex justify-center">
        {isSuccess && <StudentTable students={data} />}
      </div>
    </div>
  );
};

export default Student;
