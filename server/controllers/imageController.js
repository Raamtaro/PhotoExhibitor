import asyncHandler from 'express-async-handler'
import cloudinary from '../config/cloudinary.js'
import { configDotenv } from 'dotenv'
import { PrismaClient } from '@prisma/client'
import fs from 'fs'

const prisma = new PrismaClient();
configDotenv()

const getAllImages = asyncHandler( async (req, res) => {
    const client = req.user
    try {
        const images = await prisma.images.findMany(
            {
                where: {
                    ownerId: client.id
                }
            }
        )
        res.status(200).json({images})
    } catch (error){
        console.error(error)
        res.status(500).json({error: "Could not retrieve your images"})
    }
})

const getImage = asyncHandler( async (req, res) => {
    const client = req.user
    const id = req.body.id
    try {
        const image = await prisma.images.findUnique(
            {
                where: {
                    id: id
                }
            }
        )
        if (!image || !(image.ownerId === client.id)) {
            return res.status(403).json({error: "Unauthorized: can't retrieve image"})
        }
        res.status(200).json({image})

    }catch (error) {
        console.log(error)
        res.status(500).json({error: "Could not get the image"})
    }
})

const uploadImage = asyncHandler( async (req, res) => {
    //Need to upload the file to cloudinary in the first place, and then retrieve the url to create the image in the database.
    const client = req.user
    const {collectionId} = req.body

    if (!req.file) {
        return res.status(400).json({error: "Please include file path in the request"})
    }

    if (!collectionId) {
        return res.status(400).json({error: "Please include a collection in the request"})
    }

    try {
        const result = await cloudinary.uploader.upload(req.file.path)

        const newImage = await prisma.images.create(
            {
                data: {
                    name: req.file.originalname,
                    url: result.secure_url,
                    owner: {connect: {id: client.id}},
                    collection: {connect: {id: parseInt(collectionId)}}
                }

            }
        )

        fs.unlinkSync(req.file.path)

        res.status(201).json({message: "Upload Successful.", image: newImage})

    } catch (error) {
        console.error(error)
        res.status(500).json({error: "Could not upload the file"})
    }
})

const deleteImage = asyncHandler( async (req, res) => {
    
})

export default {
    getAllImages,
    getImage,
    uploadImage,
    deleteImage
}