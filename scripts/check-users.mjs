import {db} from './db.js';
import {user} from './src/db/schema.js';

const users = await db.select().from(user);
console.log("Users in database:");
console.log(JSON.stringify(users, null, 2));
