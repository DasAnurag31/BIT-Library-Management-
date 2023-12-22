import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useStateContext } from "../../context/ContextProvider";
import { axiosApi } from "../../api/axios";
import { useMutation } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";

const Book = () => {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { bookId } = useParams();
  const book = location.state;
  const { currentColor } = useStateContext();
  const availabilityPercentage =
    (book.copiesAvailable / book.totalCopies) * 100;

  const mutation = useMutation({
    mutationFn: () => {
      return axiosApi.delete(`/books/${bookId}`);
    },
    onSuccess: () => {
      console.log("deleted");
    },
  });

  const borrow = useMutation({
    mutationFn: () => {
      return axiosApi.post(`/books/borrow/${bookId}`);
    },
    onSuccess: () => {
      alert("Borrowed Successfully");
    },
    onError: () => {
      alert("Error");
    },
  });

  return (
    <div
      className="mx-40 my-10   bg-gray-100 rounded-2xl dark:bg-slate-900"
      style={{
        boxShadow: "rgb(38, 57, 77) 0px 20px 30px -10px",
      }}
    >
      <div className="p-5">
        <h2 className="text-4xl font-bold mb-2" style={{ color: currentColor }}>
          {"📚"} {book.title}
        </h2>
        <div className="flex gap-5 items-center font-bold">
          <div>
            {" "}
            <p className="text-gray-400 font-bold">ISBN: {book.ISBN}</p>
          </div>
          <div>
            <p className="text-gray-400">
              {"📅 "}
              {book.publicationYear}
            </p>
          </div>
          <div>
            <p className="text-gray-400">
              {"✍️"} {book.authors.join("✍️ ")}
            </p>
          </div>
        </div>
        <div>
          <div className="flex gap-2 my-4">
            <p
              className="font-bold rounded-md py-1 px-2 text-white max-w-fit"
              style={{ backgroundColor: currentColor }}
            >
              Genre: {book.genre}
            </p>
            <p
              className="font-bold rounded-md py-1 px-2 text-white max-w-fit"
              style={{ backgroundColor: currentColor }}
            >
              Publisher: {book.publisher}
            </p>
          </div>

          <p
            className={`font-bold rounded-md py-1 px-2 my-2 text-white max-w-fit ${
              availabilityPercentage <= 25
                ? "bg-red-500"
                : availabilityPercentage <= 50
                ? "bg-yellow-400"
                : "bg-green-500"
            }`}
          >
            Available: {book.copiesAvailable} / {book.totalCopies}
          </p>
        </div>
        <p className="text-gray-400 font-bold">
          {"🌟 "} {book.rating}
        </p>
        <p className="text-black my-4 indent-5 dark:text-white text-justify">
          {book.description}
        </p>
      </div>

      {user && user.role == "user" ? (
        // User Buttons
        <div className="my-2 text-center text-white font-bold bg-green-600 rounded-b-2xl">
          <button className="py-4" onClick={() => borrow.mutate()}>
            Borrow This Book
          </button>
        </div>
      ) : (
        // Admin Buttons
        <div className=" flex my-2 justify-evenly h-10 text-center items-center text-white font-bold">
          <button
            className="bg-red-500 w-[50%] rounded-bl-2xl py-4"
            onClick={() => mutation.mutate()}
          >
            Delete
          </button>
          <div className="bg-green-600 w-[50%] rounded-br-2xl py-4">
            <Link to={`/books/edit/${bookId}`} state={book}>
              Edit
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Book;
