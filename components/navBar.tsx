import Link from "next/link";
import React from "react";

export function NavBar() {
  return (
    <div className="flex bg-black py-2 items-center w-full   justify-around ">
      <Link
        className=" text-green-200 font-bold w-full text-center text-lg"
        href="/"
      >
        Home
      </Link>
    </div>
  );
}

export default NavBar;
