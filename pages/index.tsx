import Head from "next/head";

import { Exercise } from "../types/constants";

// import { allRoutines } from "../db/routines";

import Search from "../components/search";

import { useRouter } from "next/router";
import Routines from "../components/routines";
import Exercises from "../components/exercises";
import NavBar from "../components/navBar";

// type Inputs = {
//   example: string;
//   exampleRequired: string;
// };

//tiny description on exercise??
// bike , km, time
//run km,time
// extract cardio

// choose by routine, '5x5', core, football

export const SingleExercise = ({
  ex,
}: {
  ex: Exercise;
  handleDone: (e: Exercise) => void;
}) => {
  const router = useRouter();

  return (
    <div
      className="flex justify-between rounded-md hover:cursor-pointer w-full   text-white  bg-zinc-900 my-1 "
      key={ex.name}
      onClick={() => router.push(`/exercise/${ex.id}`)}
    >
      <div className="text-lg font-light capitalize ml-1">{ex.name}</div>

      <div className="flex">
        {ex.type.map((t) => (
          <span
            key={t}
            className=" uppercase  my-auto text-xs font-medium mr-2 px-2.5 py-0.5 rounded bg-zinc-800 text-blue-400"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
};

export default function Home() {
  return (
    <>
      <Head>
        <title>Gym-o-matic</title>
        <meta name="description" content="Gym tracker" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <main className="min-h-screen   flex flex-col items-center    bg-black">
        <div className="max-w-3xl w-full pb-8 flex flex-col items-center  ">
          {/* <h1 className="text-3xl font-bold underline ">
            {new Date().toLocaleDateString("en-GB")}
          </h1> */}

          {/* <Search /> */}

          <Routines />

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
