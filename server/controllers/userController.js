import asyncHandler from 'express-async-handler'
import { PrismaClient } from '@prisma/client'

import { configDotenv } from 'dotenv'

const prisma = new PrismaClient()

const getUsers = asyncHandler(async (req, res) => {
    try {
        const allUsers = await prisma.users.findMany(
            {
                select: {
                    id: true,
                    name: true,
                }
            }
        )
        res.status(200).json({allUsers})
    } catch (error) {
        console.error(error)
        res.status(500).json({error: "Couldn't retrieve users"})
    }
})

const getUser = asyncHandler( async (req, res) => { //Not sure what I'll use this for.... but good to have(?)
    // const client = req.user //Defined this, but this may be more useful in the case that I want a method to retrieve "my" own user info
    const id = req.body.id
    try {
        const user = await prisma.users.findUnique({
            where: {
                id: id
            }
        })
        res.status(200).json({user})
    } catch(error) {
        console.error(error)
        res.status(500).json({error: "Couldn't retrieve user"})
    }
})

const getMyUser = asyncHandler( async (req, res) => {
    const client = req.user
    try { 
        const myUser = await prisma.users.findUnique(
            {
                where: {
                    id: client.id
                }
            }
        )
        res.status(200).json({myUser})

    }catch(error) {
        console.log(error)
        res.status(500).json({error: "Couldn't get your user info"})
    }
})

const deleteUser = asyncHandler( async(req, res) => {
    const client = req.user
    const id = req.body.id

    if (!(client.email === "raam.sanghani@gmail.com")) { //For now my profile will be the only one with delete permissions
        res.status(403).json({error: "Unauthorized: Cannot Delete"})
    }

    try {
        const user = await prisma.users.findUnique(
            {
                where: {
                    id: id
                }
            }
        )

        if (!(user.id === client.id)) {
            return res.status(404).json({error: "Not Found"})
        }

        await prisma.users.delete(
            {
                where: {
                    id: id
                }
            }
        )
        res.status(204).json({message: "User Deleted."})

    } catch(error) {
        console.error(error)
        res.status(500).json({error: "Can't delete this user"})
    }
})



export default {
    getUsers,
    getUser,
    getMyUser,
    deleteUser
}