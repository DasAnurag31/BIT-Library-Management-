import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosApi } from "../api/axios";

const CurrentBooks = ({ userId }) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id) => {
      return axiosApi.post(`/books/return/${id}`);
    },
    onSuccess: (response, e) => {
      alert("Book Returned");
      queryClient.invalidateQueries({ queryKey: ["CurrentBooks"] });
    },
    onError: (response) => {
      alert("Book Not Returned");
    },
  });

  const fetchData = async () => {
    try {
      const response = await axiosApi.get(`/member/${userId}`);
      return response?.data.member;
    } catch (err) {
      console.log("Error in Data Fetching", err);
    }
  };
  // Data Fetching logic
  const { isPending, isError, isSuccess, data, error } = useQuery({
    queryKey: ["CurrentBooks"],
    queryFn: fetchData,
  });

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (isError) {
    console.log("Error in borrow history", error);
  }
  if (isSuccess) {
    console.log("Success in Fetching Borrow Data");
  }

  return (
    isSuccess && (
      <div className="p-4">
        <div className="text-gray-400 font-bold">
          📕 Books borrowed : {data.numberOfBooksBorrowed}
        </div>
        <div>
          <p
            className={`font-bold rounded-md py-1 px-2 my-2 text-white max-w-fit ${
              data.lateFees != 0 ? "bg-red-500" : "bg-green-500"
            }`}
          >
            {data.lateFees == 0 ? "No Dues" : "Dues:" + data.lateFees}
          </p>
        </div>
        <div className="text-gray-400 font-bold">
          Books
          <ul className="text-gray-400 font-bold">
            {data.borrowedBooks.map((book) => (
              <li key={book._id} className="flex gap-10 items-center">
                <div>📚{book.title}</div>
                <button
                  onClick={(e) => mutation.mutate(book._id)}
                  className="font-bold rounded-md py-1 px-2 my-2 text-white max-w-fit bg-red-500"
                >
                  Return
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  );
};

export default CurrentBooks;
