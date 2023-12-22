import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { authApi } from "../api/axios";
import { useAuth } from "../context/AuthProvider";
import Loading from "../components/Loading";
import GoogleIcon from "../components/GoogleIcon";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { login } = useAuth();
  const navigate = useNavigate();
  const { currentColor } = useStateContext();

  const mutation = useMutation({
    mutationFn: (data) => {
      return authApi.post("/login", data);
    },
    onSuccess: (response) => {
      console.log("Login Successful", response.data);
      login({
        user: response.data.user,
        accessToken: response.data.accessToken,
      });
      navigate("/");
    },
    onError: (err) => {
      alert("Error Login in" + err.message);
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <div className="flex h-screen justify-center dark:bg-slate-900 bg-gray-100">
      <div className="md:w-[40%] w-[80%]">
        <div className="my-7 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
          <div className="p-4 sm:p-7">
            <div className="text-center">
              <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
                Sign in
              </h1>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Don't have an account yet?
                <Link
                  className="text-blue-600 decoration-2 hover:underline font-medium dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                  to="/register"
                >
                  Sign up here
                </Link>
              </p>
            </div>

            <div className="mt-5">
              <button
                type="button"
                className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
              >
                <GoogleIcon />
                Sign in with Google
              </button>

              <div className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-[1_1_0%] before:border-t before:border-gray-200 before:me-6 after:flex-[1_1_0%] after:border-t after:border-gray-200 after:ms-6 dark:text-gray-500 dark:before:border-gray-600 dark:after:border-gray-600">
                Or
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid gap-y-4">
                  {/* Form Group */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm mb-2 dark:text-white"
                    >
                      Email address
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        id="email"
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                            message: "Invalid email address",
                          },
                        })}
                        className={`py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600 ${
                          errors.email ? "border-red-500" : ""
                        }`}
                        aria-describedby="email-error"
                      />
                      {errors.email && (
                        <div className="absolute inset-y-0 end-0 flex items-center pointer-events-none pe-3">
                          <svg
                            className="h-5 w-5 text-red-500"
                            width="16"
                            height="16"
                            fill="currentColor"
                            viewBox="0 0 16 16"
                            aria-hidden="true"
                          >
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                          </svg>
                        </div>
                      )}
                    </div>
                    {errors.email && (
                      <p className="text-xs text-red-600 mt-2">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                  {/* End Form Group */}

                  {/* Form Group */}
                  <div>
                    <div className="flex justify-between items-center">
                      <label
                        htmlFor="password"
                        className="block text-sm mb-2 dark:text-white"
                      >
                        Password
                      </label>
                      {/* <a
                        className="text-sm text-blue-600 decoration-2 hover:underline font-medium dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                        href="../examples/html/recover-account.html"
                      >
                        Forgot password?
                      </a> */}
                    </div>
                    <div className="relative">
                      <input
                        type="password"
                        id="password"
                        {...register("password", {
                          required: "Password is required",
                          minLength: {
                            value: 6,
                            message: "Password must be at least 8 characters",
                          },
                        })}
                        className={`py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600 ${
                          errors.password ? "border-red-500" : ""
                        }`}
                        aria-describedby="password-error"
                      />
                      {errors.password && (
                        <div className="absolute inset-y-0 end-0 flex items-center pointer-events-none pe-3">
                          <svg
                            className="h-5 w-5 text-red-500"
                            width="16"
                            height="16"
                            fill="currentColor"
                            viewBox="0 0 16 16"
                            aria-hidden="true"
                          >
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                          </svg>
                        </div>
                      )}
                    </div>
                    {errors.password && (
                      <p className="text-xs text-red-600 mt-2">
                        {errors.password.message}
                      </p>
                    )}
                  </div>
                  {/* End Form Group */}
                  <button
                    type="submit"
                    className={`w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600`}
                    disabled={mutation.isPending}
                    style={{ backgroundColor: currentColor }}
                  >
                    {mutation.isPending ? <Loading /> : "Sign in"}
                  </button>
                </div>
              </form>
              {/* End Form */}
            </div>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default Login;
