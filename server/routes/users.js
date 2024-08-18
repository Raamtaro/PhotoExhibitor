import { Router } from "express";
import passport from "passport";
import userController from "../controllers/userController.js";

const router = Router()

router.get('/', passport.authenticate('jwt', {session: false}), userController.getUsers)
router.get('/user', passport.authenticate('jwt', {session: false}), userController.getUser)
router.get('/myuser', passport.authenticate('jwt', {session: false}), userController.getMyUser)
router.delete('/delete', passport.authenticate('jwt', {session: false}, userController.deleteUser))


export default router