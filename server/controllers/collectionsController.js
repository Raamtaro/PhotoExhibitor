import asyncHandler from 'express-async-handler'
import { validationResult } from 'express-validator'
import { PrismaClient } from "@prisma/client"
import { configDotenv } from 'dotenv'


configDotenv()
const prisma = new PrismaClient()

const getAllCollections = asyncHandler( async(req, res) => {
    try {
        const allCollections = await prisma.collections.findMany({
            select: {
                id: true,
                owner: {
                    select: {
                        name: true
                    }
                },
                name: true, 
                images: {
                    select: {
                        name: true
                    }
                },

            }
        })
        res.status(200).json({allCollections})

    } catch(error) {
        console.log(error)
        res.status(500).json({error: "Couldn't retrieve Collections"})
    }
})

const getMyCollections = asyncHandler( async (req, res) => { //Route mainly used for display
    const client = req.user
    
    try {
        const allCollections = await prisma.collections.findMany(
            {
                where: {
                    ownerId: client.id
                },
                
                select: {
                    id: true,
                    name: true,
                    description: true,


                    owner: {
                        select: {
                            id: true,
                            name: true
                        }
                    },
                    
                    images: {
                        select: {
                            name: true,
                            url: true,
                        }
                    },
                    
                }
            }
        )
        res.status(200).json( {allCollections})
    } catch (error) {
        console.error(error)
        res.status(500).json({error: "Failed to retrieve collections"})
    }
})

const getCollection = asyncHandler( async (req, res) => {
    //get the client
    const client = req.user
    const id = parseInt(req.params.id)

    try {
        const collection = await prisma.collections.findUnique( 
            {
                where: { 
                    id: id
                },
                select: {
                    id: true,
                    name: true,
                    ownerId: true,
                    images: {
                        select: {
                            id: true,
                            name: true,
                            url: true,
                            
                        }
                    },
                    
                }
            }
        )
        if (!(collection.ownerId === client.id) || !collection) {
            return res.status(403).json({error: "Unauthorized; cannot view Collection."})
        }
        res.status(200).json({collection})
    } catch (error) {
        res.status(500).json( { error: "failed to retrieve the Collection."})
    }
})


const createCollection = asyncHandler( async (req, res) => {

    /**
     * Validation First
     */

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json( {
            error: errors.array()
        })
    }

    /**
     * If Validated, then go on to the actual code
     */

    const client = req.user
    const {name, description } = req.body
    const updateData = {}

    if (!name) {
        res.status(400).json({error:  "Must include a name"})
    }
    updateData.name = name

    if (description) updateData.description = description

    try {
        const collection = await prisma.collections.create(
            {
                data: {
                    ...updateData,
                    owner: {connect: {id: client.id} }
                },
                
            }
        )
        res.status(201).json({collection})

    } catch (error) {
        console.error(error)
        res.status(500).json({error: "Couldn't create collection"})
    }


})

const updateCollection = asyncHandler( async (req, res) => {

    /**
     * Validation First
     */

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json( {
            error: errors.array()
        })
    }

    /**
     * If Validated, then go on to the actual code
     */

    const client = req.user
    const {name, description} = req.body
    const id = parseInt(req.params.id)
    const updateData = {}

    if (!name && !description) {
        return res.status(400).json({error: "Please include either a name or a description in the body"})
    }

    if (!id) {
        return res.status(400).json({error: "Must include an id"})
    }

    if (name) updateData.name = name
    if (description) updateData.description = description

    try {
        const collection = await prisma.collections.findUnique(
            {
                where: {
                    id: id
                }
            }
        )

        if (!collection || !(collection.ownerId === client.id)) {
            return res.status(403).json( {error: "Unauthorized; Cannot update collection"})
        }


        const updatedCollection = await prisma.collections.update( {
            where: {
                id: id
            },
            data: {
                ...updateData
            }
        })
        res.status(200).json({updatedCollection})
    } catch (error) {
        console.error(error)
        return res.status(500).send({error: "Couldn't update the collection"})
    }
})

const setPublishStatus = asyncHandler( async(req, res)=> {
    const client = req.user
    
    const id = parseInt(req.params.id)

    //user shouldn't be able to publish a collection which doesn't belong to them... so, get collection, check against user id, then set publish to whichever I want
    //error checks for whether they included a publish status



    
})


const deleteCollection = asyncHandler( async (req, res) => {
    const client = req.user
    const id = parseInt(req.params.id)

    if (!id) {
        return res.status(400).json({error: "Must include an Id"})
    }

    try {
        const collection = await prisma.collections.findUnique(
            {
                where: {
                    id: id
                }
            }
        )
        if (!collection) {
            return res.status(404).json({ error: "Collection not found" });
        }

        if (!(collection.ownerId === client.id)) {
            return res.status(404).json({ error: "Collection not found" });
        
        }

        await prisma.collections.delete(
            {
                where: {
                    id: id
                }
            }
        )
        res.status(204).json({message: "Collection successfully deleted."})

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Cannot delete the Collection"})
    }
})
export default {
    getAllCollections,
    getMyCollections,
    getCollection,
    createCollection,
    updateCollection,
    deleteCollection,
    setPublishStatus
}