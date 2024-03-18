import "dotenv/config"
import { drizzle } from "drizzle-orm/neon-http"
import { neon } from "@neondatabase/serverless"

import * as schema from "../db/schema"

const sql = neon(process.env.DATABASE_URL!)
// @ts-ignore
const db = drizzle(sql, { schema })

const main = async () => {
    try {
       console.log("Seeding Database") 

       await db.delete(schema.courses)
       await db.delete(schema.userProgress)
       await db.delete(schema.units)
       await db.delete(schema.lessons)
       await db.delete(schema.challenges)
       await db.delete(schema.challengeOptions);
       await db.delete(schema.challengeProgress);

       await db.insert(schema.courses).values([
         {
           id: 1,
           title: "Spanish",
           imageSrc: "/es.svg",
         },
         {
           id: 2,
           title: "Italian",
           imageSrc: "/it.svg",
         },
         {
           id: 3,
           title: "French",
           imageSrc: "/fr.svg",
         },
         {
           id: 4,
           title: "Croatian",
           imageSrc: "/hr.svg",
         },
       ]);

       await db.insert(schema.units).values([
        {
          id: 1,
          courseId: 1,
          title: "Unit 1",
          description: "Learn the Basics of Spanish",
          order: 1,
        }
       ])

       console.log("Seeding Finished")
    } catch (error) {
        console.log(error)
        throw new Error("Failed to Seed the Database")
    }
}

main()