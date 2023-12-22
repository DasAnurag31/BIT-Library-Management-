import React from "react";
import { useLocation, useParams } from "react-router-dom";
import { useStateContext } from "../../context/ContextProvider";
import { axiosApi } from "../../api/axios";
import { useMutation } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import BorrowHistory from "../../components/BorrowHistory";

const MemberDetails = () => {
  const location = useLocation();
  const { id } = useParams();
  const member = location.state;
  const { currentColor } = useStateContext();

  return (
    <div
      className="mx-40 my-10 bg-gray-100 rounded-2xl dark:bg-slate-900"
      style={{
        boxShadow: "rgb(38, 57, 77) 0px 20px 30px -10px",
      }}
    >
      <div className="p-5">
        <h2 className="text-4xl font-bold mb-2" style={{ color: currentColor }}>
          {"🧑‍🎓"} {member.user.name}
        </h2>
        <div className="flex gap-5 items-center font-bold">
          <div>
            {" "}
            <p className="text-gray-400 font-bold">
              Email: {member.user.email}
            </p>
          </div>
          <div>
            <p className="text-gray-400">
              {"📅 "}No of Books Borrowed: {member.numberOfBooksBorrowed}
            </p>
          </div>
        </div>
        <div>
          <p
            className={`font-bold rounded-md py-1 px-2 my-2 text-white max-w-fit ${
              member.lateFees != 0 ? "bg-red-500" : "bg-green-500"
            }`}
          >
            {member.lateFees == 0 ? "No Dues" : "Dues:" + member.lateFees}
          </p>
        </div>
      </div>
      <div className="p-5">
        <BorrowHistory userId={member.user._id} />
      </div>
    </div>
  );
};

export default MemberDetails;
