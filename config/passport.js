
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const prismaClient = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new prismaClient.PrismaClient();

passport.use(new LocalStrategy(
    {usernameField: 'email'},
    async (email, password, done) => {
        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        });
        if (!user) {
            return done(null, false, {message: "Incorrect email."});
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return done(null, false, {message: "Incorrect password."});
        }
        return done(null, user);
    }
));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const user = await prisma.user.findUnique({
        where: {
            id: id
        }
    });
    done(null, user);
}
);



