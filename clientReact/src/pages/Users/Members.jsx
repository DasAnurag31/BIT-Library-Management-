import React from "react";
import { useQuery } from "@tanstack/react-query";
import { axiosApi } from "../../api/axios";
import MemberTable from "./MemberTable";

const Members = () => {
  const fetchData = async () => {
    try {
      const response = await axiosApi.get("/member");
      return response.data.members;
    } catch (err) {
      console.log("Error in Data Fetching", err);
    }
  };

  // Data Fetching logic
  const { isPending, isError, isSuccess, data, error } = useQuery({
    queryKey: ["member"],
    queryFn: fetchData,
  });

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (isError) {
    alert("Error in Fetching Members");
  }
  if (isSuccess) {
    console.log("Success in Fetching Data");
  }

  return (
    <div>
      <div className="flex justify-center">
        {isSuccess && <MemberTable members={data} />}
      </div>
    </div>
  );
};

export default Members;
