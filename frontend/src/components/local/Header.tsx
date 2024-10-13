"use client";
import useLogout from "@/hooks/useLogout";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const Header = () => {
  const router = useRouter();
  const { loading, logout } = useLogout();
  return (
    <>
      <div className="bg-[#e0d4c4] flex w-screen fixed h-[100px] justify-between z-50">
        <img
          src="/Logo.png"
          alt="Image Logo"
          className="p-2 cursor-pointer"
          onClick={() => {
            router.push("/home");
          }}
        />
        <div className="flex items-center justify-center mr-[20px]">
          <LogOut
            className="w-[40px] h-[40px] cursor-pointer"
            color="#565553"
            onClick={logout}
          />
        </div>
      </div>
    </>
  );
};

export default Header;
