import Head from "next/head";

// import { allRoutines } from "../db/routines";

// import Search from "../components/search";

import Routines from "../components/routines";
import Exercises from "../components/exercises";
import NavBar from "../components/navBar";
import StarredRoutines from "../components/starredRoutines";

export default function Home() {
  return (
    <>
      <Head>
        <title>Gym-o-matic</title>
        <meta name="description" content="Gym tracker" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen   flex flex-col items-center    bg-black">
        <div className="max-w-3xl w-full pb-8 flex flex-col items-center  ">
          {/* <h1 className="text-3xl font-bold underline ">
            {new Date().toLocaleDateString("en-GB")}
          </h1> */}

          {/* <Search /> */}

          {/* <Routines /> */}
          <StarredRoutines />

          <Exercises />
        </div>
      </main>
      <div className="py-8 flex text-lg font-light flex-col items-center text-white bg-zinc-900">
        {" "}
        Bye
      </div>
    </>
  );
}
