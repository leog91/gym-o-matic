import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "./src/db/schema";

// Create Turso client
// export const client = createClient({
//     url: process.env.TURSO_DB_URL!,
//     authToken: process.env.TURSO_DB_AUTH_TOKEN!,
// });

// Pass schema as generic to Drizzle


// import { drizzle } from "drizzle-orm/libsql";
// import { createClient } from "@libsql/client";



// // export const db = drizzle(turso);

// // src/db/index.ts
// // import { createClient } from "@libsql/client";
// // import { drizzle, BetterSQLite3Database } from "drizzle-orm/libsql";


const turso = createClient({
    url: process.env.TURSO_DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN,
});

// export const db = drizzle<typeof schema>(turso);


export const db = drizzle(turso, { schema });

// //working
// // Type the db with the schema
// export const db = drizzle(turso, { schema });


// // export const db = drizzle<typeof schema>(turso);