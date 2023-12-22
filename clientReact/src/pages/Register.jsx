import React from "react";
import { Link } from "react-router-dom";
import GoogleIcon from "../components/GoogleIcon";
import { useForm } from "react-hook-form";
import { authApi } from "../api/axios";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";

const Register = () => {
  const { register: registerUser } = useAuth();
  const { currentColor } = useStateContext();
  const navigate = useNavigate();
  const password = React.useRef({});

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  password.current = watch("password", "");

  const onSubmit = async (data) => {
    try {
      const response = await authApi.post("/registration", data);
      alert("Registration Successful" + response.data);
      registerUser({
        user: response.data.user,
        accessToken: response.data.activationToken,
      });
      navigate("/verification");
    } catch (error) {
      alert("Registration Failed" + error);
    }
  };

  return (
    <div className="flex justify-center dark:bg-slate-900 bg-gray-100">
      <div className="h-full md:w-[50%] w-[80%]">
        <div className=" flex h-full items-center ">
          <main className="w-full mx-auto ">
            <div className="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
              <div className="p-4 sm:p-7">
                <div className="text-center">
                  <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
                    Sign up
                  </h1>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    Already have an account?
                    <Link
                      className="text-blue-600 decoration-2 hover:underline font-medium dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                      to="/login"
                    >
                      Sign in here
                    </Link>
                  </p>
                </div>

                <div className="mt-5">
                  <button
                    type="button"
                    className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                  >
                    <GoogleIcon />
                    Sign up with Google
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
                          htmlFor="name"
                          className="block text-sm mb-2 dark:text-white"
                        >
                          Name
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            id="name"
                            {...register("name", {
                              required: "This field is required",
                            })}
                            className={`py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600 ${
                              errors.name ? "border-red-500" : ""
                            }`}
                            required
                          />
                          {errors.name && (
                            <div className="text-xs text-red-600 mt-2">
                              {errors.name.message}
                            </div>
                          )}
                        </div>
                      </div>
                      {/* End Form Group */}

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
                              required: "This field is required",
                              pattern: {
                                value:
                                  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                message: "Invalid email address",
                              },
                            })}
                            className={`py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600 ${
                              errors.email ? "border-red-500" : ""
                            }`}
                            required
                          />
                          {errors.email && (
                            <div className="text-xs text-red-600 mt-2">
                              {errors.email.message}
                            </div>
                          )}
                        </div>
                      </div>
                      {/* End Form Group */}

                      {/* Form Group */}
                      <div>
                        <label
                          htmlFor="password"
                          className="block text-sm mb-2 dark:text-white"
                        >
                          Password
                        </label>
                        <div className="relative">
                          <input
                            type="password"
                            id="password"
                            {...register("password", {
                              required: "This field is required",
                              minLength: {
                                value: 6,
                                message:
                                  "Password must be at least 8 characters",
                              },
                            })}
                            className={`py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600 ${
                              errors.password ? "border-red-500" : ""
                            }`}
                            required
                          />
                          {errors.password && (
                            <div className="text-xs text-red-600 mt-2">
                              {errors.password.message}
                            </div>
                          )}
                        </div>
                      </div>
                      {/* End Form Group */}

                      <button
                        type="submit"
                        className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                        style={{ backgroundColor: currentColor }}
                      >
                        Sign up
                      </button>
                    </div>
                  </form>
                  {/* End Form */}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Register;
