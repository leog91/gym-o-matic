import { db } from "../src/db";
import { sql } from "drizzle-orm";
import * as dotenv from "dotenv";
dotenv.config();

async function main() {
    try {
        console.log("Testing DB connection...");
        const result = await db.run(sql`SELECT 1`);
        console.log("DB connection successful!", result);
    } catch (e) {
        console.error("DB connection failed:", e);
    }
}

main();
