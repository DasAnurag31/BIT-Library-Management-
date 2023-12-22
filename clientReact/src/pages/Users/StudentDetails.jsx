import React from "react";
import { useLocation, useParams } from "react-router-dom";
import { useStateContext } from "../../context/ContextProvider";
import { axiosApi } from "../../api/axios";
import { useMutation } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const StudentDetails = () => {
  const location = useLocation();
  const { id } = useParams();
  const student = location.state;
  const { currentColor } = useStateContext();

  const makeMember = useMutation({
    mutationFn: () => {
      return axiosApi.post(`/member/new/${id}`);
    },
    onSuccess: () => {
      alert("Made Member");
    },
  });

  const deleteStudent = useMutation({
    mutationFn: () => {
      return axiosApi.delete(`/delete-user/${id}`);
    },
    onSuccess: () => {
      alert("Deleted");
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
          {"🧑‍🎓"} {student.name}
        </h2>
        <div className="flex gap-5 items-center font-bold">
          <div>
            {" "}
            <p className="text-gray-400 font-bold">Email: {student.email}</p>
          </div>
          <div>
            <p className="text-gray-400">
              {"📅 "}Joined: {student.createdAt.substring(0, 10)}
            </p>
          </div>
        </div>
        <div>
          <p
            className={`font-bold rounded-md py-1 px-2 my-2 text-white max-w-fit ${
              !student.isVerified ? "bg-red-500" : "bg-green-500"
            }`}
          >
            Member: {student.isVerified ? "Yes" : "No"}
          </p>
        </div>
      </div>

      <div className="flex my-2 justify-evenly h-10 text-center items-center text-white font-bold">
        {/* Delete Button */}
        <button
          className={`${
            student.isVerified
              ? "w-full rounded-b-2xl"
              : "w-[50%] rounded-bl-2xl"
          }  bg-red-500 py-4`}
          onClick={() => deleteStudent.mutate()}
        >
          Delete
        </button>

        {/* Make Member Button (conditionally rendered) */}
        {!student.isVerified && (
          <button
            className="w-[50%] rounded-br-2xl bg-green-600 py-4"
            onClick={() => makeMember.mutate()}
          >
            Make Member
          </button>
        )}
      </div>
    </div>
  );
};

export default StudentDetails;
