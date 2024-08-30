import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from 'bcryptjs';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const localStrategy = new LocalStrategy(
    { usernameField: 'email'},
    async (email, password, done) => {
        try {
            const user = await prisma.users.findUnique( { where: {email}});
            if (!user) {
                return done(null, false, {message: 'Incorrect Email.'});
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return done(null, false, { message: 'Incorrect Password.'});
            }
            return done(null, user);
        } catch(error) {
            return done(error);
        }
    }
);