import { DoneExercise } from "../types/constants";
import { exercises } from "../db/exercises";

// const exercisesHistory: DoneExercise[] = exercises.map((e) => {
//   return { ...e, date: new Date().toJSON() };
// });

let exercisesHistory: DoneExercise[] = [];

//generate data
for (let index = 0; index < 50; index++) {
  const date = new Date(new Date().setDate(new Date().getDate() + index));

  //skip some days
  if (Math.floor(Math.random() * 100) > 35) continue;

  exercisesHistory = [
    ...exercisesHistory,
    ...Object.entries(exercises).map((e) => {
      return { ...e[1], date: date.toJSON() };
    }),
  ];
}

// new Date(new Date().setUTCDate(new Date().getUTCDate() + 1));

export default function History() {
  return (
    <>
      <div className="min-h-screen w-full max-w-sm flex flex-col items-center  bg-green-800">
        <h1 className="">history</h1>
        <div className=" flex ">by date, tag, exercise</div>
        {exercisesHistory.map((e) => (
          <div
            className="flex w-full my-0.5 px-1 text-green-100 font-light  bg-green-600 justify-between"
            key={e.name + e.date}
          >
            <div className="w-36 ">{e.name}</div>
            <div>{new Date(e.date).toLocaleDateString("en-GB")}</div>
            <div>
              <button
                className="rounded-sm bg-green-300 mx-1"
                // onClick={() => console.log("edit TODO")}
              >
                📝
              </button>
              <button
                // onClick={() => handleRemoveDone(e)}
                className="bg-red-600 px-2 rounded-sm"
              >
                x
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
