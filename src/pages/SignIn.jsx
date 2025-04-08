import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Input from "../components/Input";
import ErrorPage from "../components/Error";
import AuthContext from "../lib/context/AuthContext";
import { validateFormData } from "../lib/utils/validateFormData";
import BASE_URL from "../lib/constants/ApiUrl";

const Signin = () => {
  const { setIsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFormData = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError(null);

    const formErrors = validateFormData(formData);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        `${BASE_URL}/users?email=${formData.email}&password=${formData.password}`
      );

      if (!response.ok) {
        throw new Error("Server error: Unable to check user details.");
      }

      const users = await response.json();

      if (users.length === 0) {
        setErrors({
          email: "Wrong email or password",
          password: "Wrong email or password",
        });
        setIsLoading(false);
        return;
      }

      localStorage.setItem("userAuthToken", users[0].id);
      setIsAuthenticated(true);
      setFormData({ email: "", password: "" });
      setErrors({});

      navigate("/");
    } catch (error) {
      console.error("Error during sign-in:", error);
      setServerError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (serverError) {
    return <ErrorPage code={500} title="Server Error" message={serverError} />;
  }

  return (
    <>
      <section className="bg-[#201d30] text-white flex justify-center items-center min-h-screen p-5">
        <div className="w-full max-w-[1200px] min-h-[600px] bg-[#2a2438] rounded-2xl overflow-hidden shadow-xl flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 bg-[#5d4a8a] relative flex flex-col justify-between p-8 min-h-[200px] md:min-h-0">
            <div className="absolute inset-0 bg-gradient-to-b from-[rgba(86,53,163,0.7)] to-[rgba(70,67,77,0.7)] z-0"></div>

            <div className="relative z-10 text-2xl font-bold text-white">
              Amnil Technologies
            </div>

            <div className="relative z-10 text-center text-white">
              <h2 className="text-2xl font-semibold mb-2">
                Capturing Moments,
              </h2>
              <p className="text-base opacity-90">Creating Memories</p>
            </div>
          </div>

          <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col bg-[#2a2438]">
            <h1 className="text-3xl font-semibold mb-6 text-white md:text-left text-center">
              Sign In
            </h1>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-1 w-full items-center md:items-start"
            >
              <Input
                type="email"
                placeholder="example@email.com"
                name="email"
                label="Email"
                value={formData.email}
                onChange={handleFormData}
                error={errors.email}
              />

              <Input
                type="password"
                name="password"
                label="Password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleFormData}
                error={errors.password}
              />

              <button
                disabled={isLoading}
                className="bg-[#7b68ee] text-white border-none rounded-lg py-3.5 px-5 text-base font-semibold cursor-pointer transition-colors hover:bg-[#6a5acd] active:bg-[#5a4fcb] mt-3 w-full max-w-[400px]"
              >
                {isLoading ? "Logging in..." : "Sign In"}
              </button>

              <div className="mt-4 text-center w-full max-w-[400px]">
                <span className="text-gray-400">Don't have an account?</span>{" "}
                <Link to="/signup" className="text-[#7b68ee] hover:underline">
                  Create account
                </Link>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signin;
