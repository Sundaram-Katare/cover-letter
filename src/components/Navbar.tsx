"use client";
import { signOut } from "next-auth/react";
import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function Navbar() {
  const { data: session, status } = useSession()

  return (
    <>
      <div className="px-4 py-4 bg-transparent font-poppins text-black flex justify-between ">
        <div className="w-1/2">
          <h1>Name</h1>
        </div>

        <div className="flex justify-between w-1/2">
          <div className="flex flex-row space-x-6 font-poppins text-xl">
            <Link href={"/"} className="text-[#D9AC57]">Home</Link>
            <Link href={"/pages/faq"}>FAQ</Link>
            <Link href={""}>Gallery</Link>
            <Link href={"/pages/pricing"}>Pricing</Link>
            <Link href={"/pages/auth/generator"}>Contact</Link>
          </div>

          <div>
            {!session ? (
              <Link href="/pages/signin" className="bg-[#082D8C] text-white text-xl font-regular px-2 py-1 rounded-2xl">
                Get Started
              </Link>
            ) : (
              <button
                onClick={() => signOut({ callbackUrl: '/pages/signin' })}
                className="text-xl ml-4"
              >
                Logout
              </button>
            )}
          </div>

        </div>
      </div>
    </>
  )
}