import { Router } from "express";
import passport from "passport";
import imageController from "../controllers/imageController.js"
import upload from "../middlewares/multerSetup.js";


const router = Router()

router.get('/', passport.authenticate('jwt', {session: false}), imageController.getAllImages)
router.get('/image', passport.authenticate('jwt', {session: false}), imageController.getImage)
router.post('/upload', passport.authenticate('jwt', {session: false}), upload.single('image'), imageController.uploadImage)
router.delete('/image', passport.authenticate('jwt', {session: false}), imageController.deleteImage)

export default router