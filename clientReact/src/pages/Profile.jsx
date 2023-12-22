import React from "react";
import { useQuery } from "@tanstack/react-query";
import { axiosApi } from "../api/axios";
import { useStateContext } from "../context/ContextProvider";
import { Link } from "react-router-dom";
import CurrentBooks from "../components/CurrentBooks";

const Profile = () => {
  const { currentColor } = useStateContext();

  // Fetch Data
  const fetchData = async () => {
    try {
      const response = await axiosApi.get("/me");
      return response?.data?.user;
    } catch (err) {
      alert("Error in Fetching Information");
      return [];
    }
  };

  const { isPending, isError, isSuccess, data, error } = useQuery({
    queryKey: ["profile"],
    queryFn: fetchData,
  });
  if (isPending) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error: {error.message}</div>;
  }
  if (isSuccess) {
    console.log("Profile Data Fetched");
  }

  return (
    data && (
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
          {data.name}
        </h2>
        <div className="flex flex-col gap-2 px-4 font-bold">
          <div>
            <p className="text-gray-400 font-bold uppercase">
              {""}🛡️ Category: {data.role}
            </p>
          </div>
          <div>
            <p className="text-gray-400">
              {"✉️"} Email: {data.email}
            </p>
          </div>
        </div>

        <div>
          <CurrentBooks userId={data._id} />
        </div>
      </div>
    )
  );
};

export default Profile;
