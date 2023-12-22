import React, { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { axiosApi } from "../../api/axios";
import BooksTable from "./BooksTable";
import { toast } from "react-toastify";

const fetchBooks = async () => {
  try {
    const response = await axiosApi.get("/books");
    return response.data.books;
  } catch (err) {
    console.log("Error in Fetching Books " + err);
  }
};

const Explore = () => {
  // Data Fetching logic
  const { isPending, isError, isSuccess, data, error } = useQuery({
    queryKey: ["books"],
    queryFn: fetchBooks,
  });

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  if (isSuccess) {
    console.log("Books Fetched");
  }

  return (
    <div className="flex justify-center">
      {data && <BooksTable books={data} />}
    </div>
  );
};

export default Explore;
