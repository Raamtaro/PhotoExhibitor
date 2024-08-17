import { Router } from "express";
import passport from "passport";
import authController from "../controllers/authController.js";
import validationMiddlewares from "../middlewares/validationMiddlewares.js";


const router = Router();

router.post('/register', validationMiddlewares.validateUserCreation , authController.registerUser)
router.post('/login', authController.loginUser)
router.post('/logout', authController.logoutUser)
router.get('/profile', passport.authenticate('jwt', {session: false}), authController.getProfile)

export default router