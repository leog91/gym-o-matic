"use client";

import React, { useState } from "react";
import exercises from "../../../db/exercises.json";
import Link from "next/link";

function Page() {
  const [filter, setFilter] = useState("");

  const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const exercise = formData.get("exercise") as string;
    setFilter(exercise);
  };

  return (
    <div className="bg-black min-h-screen text-white flex flex-col items-center">
      <form onSubmit={handleSubmit}>
        <input
          className="my-4 text-black"
          name="exercise"
          type="text"
          placeholder="Exercise"
        />
      </form>

      <table className="bg-slate-700  table-auto   border border-red-400 border-separate ">
        <thead>
          <tr>
            <th className="border bg-slate-500 border-slate-400">🔗</th>
            <th className="border bg-slate-500 border-slate-400">id</th>
            <th className="border bg-slate-500 border-slate-400">name</th>
            <th className="border bg-slate-500 border-slate-400">type</th>
            <th className="border bg-slate-500 border-slate-400">info</th>
            <th className="border bg-slate-500 border-slate-400">youtube</th>
          </tr>
        </thead>
        <tbody>
          {exercises
            .filter((x) =>
              String(x.name).toLowerCase().includes(filter.toLowerCase())
            )

            //move to db
            .sort((a, b) => {
              const nameA = a.name.toUpperCase();
              const nameB = b.name.toUpperCase();
              if (nameA < nameB) {
                return -1;
              }
              if (nameA > nameB) {
                return 1;
              }

              return 0;
            })
            .map((e) => (
              <tr key={e.id}>
                <th className="border border-slate-200">
                  <Link
                    className="bg-green-500   rounded-md text-sm  hover:bg-green-300 hover:text-green-800"
                    href={`/exercise/${e.id}`}
                  >
                    👁
                  </Link>
                </th>
                <th className="border  border-slate-200">{e.id}</th>
                <th className="border   border-slate-200">{e.name}</th>
                <th className="border border-slate-200">{e.type}</th>
                <th className="border border-slate-200">{e.info}</th>
                <th className="border border-slate-200"> {e.youtube}</th>
              </tr>
              //   <li key={e.id}>{e.name}</li>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default Page;
