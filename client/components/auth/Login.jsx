"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { userLogin } from "../../hooks/axiosAPI";
import { loginSchema } from "../../lib/zodSchema";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [serverErrors, setServerErrors] = useState({});

  const userAuth = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (userAuth?.isAuthenticated) {
      router.push("/");
    }
  }, [userAuth.isAuthenticated]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      loginSchema.parse({ email, password });

      const res = await userLogin("/login", { email, password });

      if (!res.error) {
        userAuth.setUser(res);
        userAuth.setRefetch(true);
        router.push("/");
      } else {
        setServerErrors(res.error.data);
      }
    } catch (error) {
      setErrors(error.errors);
    }
  };

  return (
    <div className="h-full flex items-center justify-center w-full">
      <div className="bg-white text-black w-[30rem] rounded-3xl">
        <div className="flex items-center flex-col py-8 px-14">
          <h2 className="text-2xl pt-6">Login to your account</h2>

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
              </div>
            )}

            <div className="flex flex-col gap-1">
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

            <div className="flex flex-col gap-1">
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

            <div className="flex gap-2 items-center">
              <input type="checkbox" className="h-4 w-4" id="checkID" />
              <label htmlFor="checkID">Remember me</label>
            </div>

            <div className="py-6">
              <button
                onClick={handleLogin}
                className="bg-[#1d4c91] p-3 rounded text-white w-full"
              >
                Login
              </button>
            </div>

            <div className="text-center">
              <h6>New to Book Store?</h6>
              <Link href="/signup" className="text-blue-500 font-semibold">
                Sign Up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
