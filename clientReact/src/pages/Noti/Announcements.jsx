import React from "react";
import { axiosApi } from "../../api/axios";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Announcements = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (data) => {
      return axiosApi.post("/announcement", data);
    },
    onSuccess: (response) => {
      console.log("added Successful", response.data);
      alert("Notification Send Successfully");
      navigate("/");
    },
    onError: (response) => {
      alert("Notification Not Sent");
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <div className="mt-10">
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto">
        {/* Message */}
        <div className="relative z-0 w-full mb-5 group">
          <textarea
            name="message"
            id="message"
            {...register("message", {
              required: "Message is required",
            })}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer resize-none"
            placeholder=" "
          />
          <label
            htmlFor="message"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Message
          </label>
          {errors.message && (
            <p className="text-red-500 text-xs italic">
              {errors.message.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? "Sending" : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default Announcements;
