import React, { useEffect } from "react";
import { axiosApi } from "../../api/axios";
import { useMutation } from "@tanstack/react-query";
import { useLocation, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

const EditBook = () => {
  const { bookId } = useParams();
  const location = useLocation();
  const book = location.state;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    reset({ ...book, authors: book.authors.join(",") });
    return () => {
      reset({});
    };
  }, []);

  const mutation = useMutation({
    mutationFn: (data) => {
      return axiosApi.put(`/books/${bookId}`, data);
    },
    onSuccess: (response) => {
      alert("Updated", response.data);
    },
    onError: () => {
      alert("Error in Updating");
    },
  });

  const onSubmit = (data) => {
    const authorsArray = data.authors.split(",").map((author) => author.trim());
    const updatedData = { ...data, authors: authorsArray };
    mutation.mutate(updatedData);
  };

  return (
    <div className="m-10">
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto ">
        {/* Title */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="title"
            id="title"
            {...register("title", { required: "Title is required" })}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="title"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Title
          </label>
          {errors.title && (
            <p className="text-red-500 text-xs italic">
              {errors.title.message}
            </p>
          )}
        </div>

        {/* Authors */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="authors"
            {...register("authors", {
              required: "Authors are required",
            })}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="authors"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Authors (comma-separated)
          </label>
          {errors.authors && (
            <p className="text-red-500 text-xs italic">
              {errors.authors.message}
            </p>
          )}
        </div>

        {/* ISBN */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="ISBN"
            id="ISBN"
            {...register("ISBN", { required: "ISBN is required" })}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="ISBN"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            ISBN
          </label>
          {errors.ISBN && (
            <p className="text-red-500 text-xs italic">{errors.ISBN.message}</p>
          )}
        </div>

        {/* Description */}
        <div className="relative z-0 w-full mb-5 group">
          <textarea
            name="description"
            id="description"
            {...register("description", {
              required: "Description is required",
            })}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer resize-none"
            placeholder=" "
          />
          <label
            htmlFor="description"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Description
          </label>
          {errors.description && (
            <p className="text-red-500 text-xs italic">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Genre */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="genre"
            id="genre"
            {...register("genre", { required: "Genre is required" })}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="genre"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Genre
          </label>
          {errors.genre && (
            <p className="text-red-500 text-xs italic">
              {errors.genre.message}
            </p>
          )}
        </div>

        {/* Copies Available */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="number"
            name="copiesAvailable"
            id="copiesAvailable"
            {...register("copiesAvailable", {
              required: "Copies Available is required",
            })}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="copiesAvailable"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Copies Available
          </label>
          {errors.copiesAvailable && (
            <p className="text-red-500 text-xs italic">
              {errors.copiesAvailable.message}
            </p>
          )}
        </div>

        {/* Total Copies */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="number"
            name="totalCopies"
            id="totalCopies"
            {...register("totalCopies", {
              required: "Total Copies is required",
            })}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="totalCopies"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Total Copies
          </label>
          {errors.totalCopies && (
            <p className="text-red-500 text-xs italic">
              {errors.totalCopies.message}
            </p>
          )}
        </div>

        {/* Publication Year */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="number"
            name="publicationYear"
            id="publicationYear"
            {...register("publicationYear", {
              required: "Publication Year is required",
            })}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="publicationYear"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Publication Year
          </label>
          {errors.publicationYear && (
            <p className="text-red-500 text-xs italic">
              {errors.publicationYear.message}
            </p>
          )}
        </div>

        {/* Publisher */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="publisher"
            id="publisher"
            {...register("publisher", { required: "Publisher is required" })}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="publisher"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Publisher
          </label>
          {errors.publisher && (
            <p className="text-red-500 text-xs italic">
              {errors.publisher.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default EditBook;
