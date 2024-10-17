import { Router } from "express";
import collectionsController from "../controllers/collectionsController.js";
import validationMiddlewares from "../middlewares/validationMiddlewares.js";
import passport from "passport";


const router = Router()
router.get('/', passport.authenticate('jwt', {session: false}), collectionsController.getAllCollections)
router.get('/mycollections', passport.authenticate('jwt', {session: false}), collectionsController.getMyCollections) //Eventually protect w/ JWT, I want to be the only one able to see each collection
router.get('/:id', passport.authenticate('jwt', {session: false}), collectionsController.getCollection) 
router.post('/collection', passport.authenticate('jwt', {session: false}), validationMiddlewares.validateCollectionCreate, collectionsController.createCollection)
router.put('/:id/update', passport.authenticate('jwt', {session: false}), validationMiddlewares.validateCollectionMod, collectionsController.updateCollection)
router.put('/:id/publish', passport.authenticate('jwt', {session: false}), validationMiddlewares.validateCollectionMod, collectionsController.setPublishStatus)
router.delete('/:id/delete', passport.authenticate('jwt', {session: false}), collectionsController.deleteCollection)



export default router