import { useForm } from "react-hook-form";
import { authApi } from "../../api/axios";
import { useAuth } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";

type VerificationForm = {
  activationCode: string;
};

const Verification = () => {
  const { accessToken } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VerificationForm>();

  const handleActivation = async (data: VerificationForm) => {
    try {
      if (accessToken) {
        const activationData = {
          activation_token: accessToken,
          activation_code: data.activationCode,
        };

        const response = await authApi.post("/activate-user", activationData);

        console.log("Activation Successful", response.data);
        navigate("/auth/login");
      } else {
        console.error("User is not logged in or doesn't have an access token.");
      }
    } catch (error) {
      console.error("Activation Failed", error);
    }
  };

  return (
    <div className="max-w-md mx-auto my-10 p-6 bg-white rounded shadow-md">
      <div>
        <p className="mb-4 text-lg font-semibold">Activation Page</p>
        <form onSubmit={handleSubmit(handleActivation)}>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Enter activation code"
              {...register("activationCode", {
                required: "Activation code is required",
              })}
              className={`w-full px-3 py-2 border rounded-md ${
                errors.activationCode ? "border-red-500" : ""
              }`}
            />
            {errors.activationCode && (
              <p className="text-red-500 text-xs italic">
                {errors.activationCode.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Activate
          </button>
        </form>
      </div>
    </div>
  );
};

export default Verification;
