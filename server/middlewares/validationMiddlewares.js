import { body } from 'express-validator'

const validateUserCreation = [
    body("email").trim()
        .isEmail().withMessage("Must be a valid email"),
    body("password").trim()
        .isLength({ min: 6}).withMessage("Must be at least 6 characters"),
    body("name").trim()
        .isString().withMessage("Must be a string!")
        .isLength({min: 4}).withMessage("Must be at least 4 characters")

]

const validateUserUpdate = [
    body("name").optional().trim()
        .isString().withMessage("Must be a string!")
        .isLength({min: 4}).withMessage("Must be at least 4 characters")

]

const validateCollectionCreation = [
    body("name").trim()
        .isString().withMessage("Must be a String!")
        .isLength({min: 3}).withMessage("Must be at least 3 Characters long!")
]




export default {
    validateUserCreation,
    validateUserUpdate,
    validateCollectionCreation
    // validatePostMod,
    // validateCommentMod
}