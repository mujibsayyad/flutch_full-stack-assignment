"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { userSignup } from "../../hooks/axiosAPI";
import { signupSchema } from "../../lib/zodSchema";
import { useAuth } from "../../context/AuthContext";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [serverErrors, setServerErrors] = useState({});

  const userAuth = useAuth();
  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      signupSchema.parse({ name, email, password });

      const res = await userSignup("/signup", { name, email, password });

      if (!res.error) {
        userAuth.setUser(res);
        return router.push("/");
      } else {
        setServerErrors(res.error.data);
      }
    } catch (error) {
      setErrors(error.errors);
    }
  };

  useEffect(() => {
    if (userAuth?.isAuthenticated) {
      router.push("/");
    }
  }, [userAuth]);

  return (
    <div className="h-full flex items-center justify-center w-full">
      <div className="bg-white text-black w-[30rem] rounded-3xl">
        <div className="flex items-center flex-col py-8 px-14">
          <h2 className="text-2xl pt-6">Create Account</h2>

          <form className="flex flex-col gap-5 mt-10 w-full">
            {serverErrors && serverErrors?.message && (
              <p className="bg-red-400 p-2 text-center font-semibold">
                {serverErrors?.message}
              </p>
            )}

            {errors?.length > 0 && (
              <div className="flex flex-col gap-2">
                {errors[0] && (
                  <p className="text-white bg-red-600 p-2">
                    {errors[0]?.message}
                  </p>
                )}
                {errors[1] && (
                  <p className="text-white bg-red-600 p-2">
                    {errors[1]?.message}
                  </p>
                )}
                {errors[2] && (
                  <p className="text-white bg-red-600 p-2">
                    {errors[2]?.message}
                  </p>
                )}
              </div>
            )}

            <div className="flex flex-col gap-2">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border-2 border-[#a2a2a2] rounded-md p-1"
                placeholder="Enter your name"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-2 border-[#a2a2a2] rounded-md p-1"
                placeholder="Enter your email"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-2 border-[#a2a2a2] rounded-md p-1"
                placeholder="Enter your password"
              />
            </div>

            <div className="py-6">
              <button
                onClick={handleSignup}
                className="bg-[#1d4c91] p-3 rounded text-white w-full"
              >
                Sign up
              </button>
            </div>

            <div className="text-center">
              <h6>Already have an account?</h6>
              <Link href="/login" className="text-blue-500 font-semibold">
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
