import React, { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useStateContext } from "../../context/ContextProvider";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { axiosApi } from "../../api/axios";

const Notification = () => {
  const { id } = useParams();
  const { currentColor } = useStateContext();
  const location = useLocation();
  const { title, message, status } = location.state;
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (data) => {
      return axiosApi.put(`/notification/${data}`);
    },
    onSuccess: (response) => {
      alert("Notification Updated");
      queryClient.invalidateQueries({ queryKey: ["notification"] });
    },
    onError: (response) => {
      alert("Notification Not Updated");
    },
  });
  useEffect(() => {
    if (status != undefined && status == "unread") {
      mutation.mutate(id);
    }
  }, []);

  return (
    <div
      className="mx-40 my-10   bg-gray-100 rounded-2xl dark:bg-slate-900"
      style={{
        boxShadow: "rgb(38, 57, 77) 0px 20px 30px -10px",
      }}
    >
      <div className="p-5">
        <h2 className="text-4xl font-bold mb-2" style={{ color: currentColor }}>
          {"🔔"} {title}
        </h2>

        <p className="text-black my-4 indent-5 dark:text-white text-justify">
          {message}
        </p>
      </div>
    </div>
  );
};

export default Notification;
