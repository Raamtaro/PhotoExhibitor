import { Router } from "express";
import collectionsController from "../controllers/collectionsController.js";
import validationMiddlewares from "../middlewares/validationMiddlewares.js";
import passport from "passport";


const router = Router()
router.get('/', passport.authenticate('jwt', {session: false}), collectionsController.getAllCollections)
router.get('/mycollections', passport.authenticate('jwt', {session: false}), collectionsController.getMyCollections) //Eventually protect w/ JWT, I want to be the only one able to see each collection
router.get('/:id', passport.authenticate('jwt', {session: false}), collectionsController.getCollection) 
router.post('/collection', passport.authenticate('jwt', {session: false}), validationMiddlewares.validateCollectionCreate, collectionsController.createCollection)
router.put('/collection', passport.authenticate('jwt', {session: false}), validationMiddlewares.validateCollectionMod, collectionsController.updateCollection)



export default router