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
    <aside className="flex flex-col gap-4 md:px-10 md:py-24">
      <div className="text-xl hover:bg-[#313c4270] w-fit p-2 px-6 hover:rounded-xl cursor-pointer">
        <Link href="/" className="flex items-center gap-3">
          <IoMdHome className="text-3xl" />
          <h5>Home</h5>
        </Link>
      </div>

      <UploadBook />

      <div
        className="flex items-center gap-3 text-xl hover:bg-[#313c4270] w-fit p-2 px-6 hover:rounded-xl cursor-pointer"
        onClick={handleLogout}
      >
        <FaUserAlt className="text-3xl" />

        <h5>Logout</h5>
      </div>
    </aside>
  );
};

export default LeftSideBar;
