import Head from "next/head";

import Exercises from "../components/exercises";

import StarredRoutines from "../components/starredRoutines";
import FavoriteRoutinesList from "../components/FavoriteRoutinesList";
import MyRoutines from "../components/MyRoutines";

export default function Home() {
  return (
    <>
      <Head>
        <title>Gym-o-matic</title>
        <meta name="description" content="Gym tracker" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen flex flex-col items-center bg-black">
        <div className="max-w-3xl w-full pb-8 flex flex-col items-center">
          <MyRoutines />
          <FavoriteRoutinesList />
          <StarredRoutines />

          <Exercises />
        </div>
      </main>
      <footer className="py-8 flex text-lg font-light flex-col items-center text-white bg-zinc-900 border-t border-zinc-800">
        Bye
      </footer>
    </>
  );
}
