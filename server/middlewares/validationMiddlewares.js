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

const validateCollectionCreate = [
    body("name").trim()
        .isString().withMessage("Must be a String!")
        .isLength({min: 3}).withMessage("Must be at least 3 Characters long!"),
    body("description").trim()
        .isString().withMessage("Must be a String!")
        .isLength({min: 3, max: 5000}).withMessage("Must be between 3-5000 characters")
]

const validateCollectionMod = [
    body("description").optional().trim()
        .isString().withMessage("Must be a String!")
        .isLength({min: 3}).withMessage("Must be at least 3 Characters long!"),
    body("name").optional().trim()
        .isString().withMessage("Must be a String!")
        .isLength({min: 3}).withMessage("Must be at least 3 Characters")
]




export default {
    validateUserCreation,
    validateUserUpdate,
    validateCollectionCreate,
    validateCollectionMod
    // validatePostMod,
    // validateCommentMod
}