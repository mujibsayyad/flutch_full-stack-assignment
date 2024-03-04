"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import UploadBook from "./UploadBook";
import { IoMdHome } from "react-icons/io";
import { FaUserAlt } from "react-icons/fa";

import { useAuth } from "../../context/AuthContext";
import { userLogout } from "../../hooks/axiosAPI";

const LeftSideBar = () => {
  const userAuth = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    const awaitLogout = await userLogout("/logout");

    if (awaitLogout.isSignedIn === false) {
      userAuth.setUser(null);
      userAuth.setRefetch(true);
      router.push("/login");
    }
  };

  if (!userAuth.isAuthenticated) return null;

  return (
    <aside className="flex justify-between w-full md:flex-col gap-4 md:px-10 md:py-24">
      <div className="text-base md:text-xl hover:bg-[#313c4270] w-fit p-2 px-6 hover:rounded-xl cursor-pointer">
        <Link href="/" className="flex flex-col md:flex-row items-center gap-3">
          <IoMdHome className="text-lg md:text-3xl" />
          <h5>Home</h5>
        </Link>
      </div>

      <UploadBook />

      <div
        className="flex flex-col md:flex-row items-center gap-3 text-base md:text-xl hover:bg-[#313c4270] w-fit p-2 px-6 hover:rounded-xl cursor-pointer"
        onClick={handleLogout}
      >
        <FaUserAlt className="text-lg md:text-3xl" />

        <h5>Logout</h5>
      </div>
    </aside>
  );
};

export default LeftSideBar;
