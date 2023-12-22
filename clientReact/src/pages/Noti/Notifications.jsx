import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosApi } from "../../api/axios";
import { useStateContext } from "../../context/ContextProvider";
import { Link } from "react-router-dom";

const Notifications = () => {
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
      alert(response.message);
    },
  });

  const fetchNotifications = async () => {
    try {
      const response = await axiosApi.get("/notification/me");
      return response.data.notifications;
    } catch (err) {
      console.log("Error Loding Notification");
      return [];
    }
  };
  const { currentColor } = useStateContext();
  const { isPending, isError, isSuccess, data, error } = useQuery({
    queryKey: ["notification"],
    queryFn: fetchNotifications,
  });
  if (isPending) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error: {error.message}</div>;
  }
  if (isSuccess) {
  }

  return (
    <div className="mt-10 ml-10">
      <h2 className="text-3xl font-semibold" style={{ color: currentColor }}>
        Notifications
      </h2>
      <div className="my-5 ">
        {isPending == true && "Loading"}
        {data &&
          data.map((notification) => (
            <Link
              className=""
              key={notification._id}
              to={`${notification._id}`}
              state={notification}
            >
              <div
                className="p-4 my-4 max-w-sm font-medium rounded-md bg-slate-100  dark:bg-slate-800 flex justify-between items-center"
                style={{ color: currentColor }}
              >
                <div className="text-ellipsis w-[50%]">
                  {notification.title}
                </div>
                {notification.status == "unread" ? (
                  <div
                    className="font-normal text-slate-800 dark:text-white underline"
                    onClick={() => {
                      return mutation.mutate(notification._id);
                    }}
                  >
                    Mark as Read
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Notifications;
