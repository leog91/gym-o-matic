import { PrismaClient } from '@prisma/client'

//npm prisma-generate

import type { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient();


type Exercises = {
    id: string,
    name: string;
    createdAt: Date;
    updatedAt: Date;
}[];


export default async function handler(req: NextApiRequest,
    res: NextApiResponse<Exercises>) {
    await prisma.$connect();


    const createUser = await prisma.exercise.create({
        data: {
            name: "baneeasd",
        }
    });


    // await prisma.user.create({
    //     data: {
    //         name: 'Alice',
    //         email: 'alice@prisma.io',
    //         posts: {
    //             create: { title: 'Hello World' },
    //         },
    //         profile: {
    //             create: { bio: 'I like turtles' },
    //         },
    //     },
    // })


    const allexs = (await prisma.exercise.findMany())
        .map(e => { return { ...e, id: e.id.toString() } })



    res.status(200).json(allexs)

    // res.status(200).json({ name: 'John Doe' })

    // res.status(200).json(allRecipes);
}
