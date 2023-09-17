import Link from "next/link";
import React from "react";

export function NavBar() {
  return (
    <div className="flex bg-neutral-900 py-3 items-center w-full justify-center   ">
      <div className="max-w-md  w-full">
        <Link
          className=" text-black  bg-yellow-400  font-black  px-1.5 py-1  rounded-md text-center  text-lg"
          href="/"
        >
          Home
        </Link>
      </div>
    </div>
  );
}

export default NavBar;
