import React, { useState,  } from "react";
import { useNavigate, Link } from "react-router-dom";
import Input from "../components/Input";
import ErrorPage from "../components/Error";
import { validateFormData } from "../lib/utils/validateFormData";
import BASE_URL from "../lib/constants/ApiUrl";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
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
    const formErrors = validateFormData(formData, true);

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsLoading(true);

    try {
      const existingUserResponse = await fetch(
        `${BASE_URL}/users?email=${formData.email}`
      );
      const existingUsers = await existingUserResponse.json();

      if (existingUsers.length > 0) {
        setErrors({ email: "Email already exists. Please use another email." });
        setIsLoading(false);
        return;
      }

      const response = await fetch(`${BASE_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Error Creating Account");
      }

      console.log("Success");

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      setErrors({});

      navigate("/signin");
    } catch (error) {
      console.error(error.message);
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
              Create an account
            </h1>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-1 w-full items-center md:items-start"
            >
              <Input
                type="text"
                placeholder="Sushank"
                name="firstName"
                label="First Name"
                value={formData.firstName}
                onChange={handleFormData}
                error={errors.firstName}
              />

              <Input
                type="text"
                placeholder="Gurung"
                name="lastName"
                label="Last Name"
                value={formData.lastName}
                onChange={handleFormData}
                error={errors.lastName}
              />

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

              <Input
                type="password"
                name="confirmPassword"
                label="Confirm Password"
                placeholder="Re-enter your password"
                value={formData.confirmPassword}
                onChange={handleFormData}
                error={errors.confirmPassword}
              />

              <button
                disabled={isLoading}
                className="bg-[#7b68ee] text-white border-none rounded-lg py-3.5 px-5 text-base font-semibold cursor-pointer transition-colors hover:bg-[#6a5acd] active:bg-[#5a4fcb] mt-3 w-full max-w-[400px]"
              >
                {isLoading ? "Creating..." : "Create account"}
              </button>

              <div className="mt-4 text-center w-full max-w-[400px]">
                <span className="text-gray-400">Already have an account?</span>{" "}
                <Link to="/signin" className="text-[#7b68ee] hover:underline">
                  Sign in
                </Link>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signup;
