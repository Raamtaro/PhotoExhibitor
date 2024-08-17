import asyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import passport from 'passport'
import { PrismaClient } from '@prisma/client'
import { configDotenv } from 'dotenv'
import { validationResult } from 'express-validator'

configDotenv();

const prisma = new PrismaClient()

const registerUser = asyncHandler(async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json( {
            error: errors.array()
        })
    }


    const {email, password, name} = req.body;

    const existingUser = await prisma.users.findUnique({
        where: {email: email}
    })
    if (existingUser) {
        return res.status(400).json({error: 'Email is already in use'})
    }


    if (!email || !password || !name) {
        return res.status(400).json({error: "Please include email, password and name"})
    };

    const hashedPassword = await bcrypt.hash(password, 10);
    const userData = {
        email, 
        password: hashedPassword,
        
    };

    if (name) userData.name = name;

    const user = await prisma.users.create({
        data: userData
    })

    const token = jwt.sign( { userId: user.id}, process.env.JWT_SECRET, {expiresIn: '1h'}); //Updated from the userController module - generate the jwt

    res.status(201).json({user, token});
})

const loginUser = (req, res, next) => {
    passport.authenticate('local', { session: false }, (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(400).json({ error: info.message });
      }
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ user, token });
    })(req, res, next);
  };



const logoutUser = (req, res) => {
    req.logout(function(err) {
        if (err) {
        return res.status(500).json({ error: 'Failed to log out' });
        }

        req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to destroy session' });
        }

        res.clearCookie('connect.sid'); // Clear the session cookie
        res.status(200).json({ message: 'Successfully logged out' });
        });
    });
}

const getProfile = asyncHandler( async (req, res) => {
    res.json(req.user);
})


export default {
    registerUser, loginUser, logoutUser, getProfile
}