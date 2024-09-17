const express = require("express");
const {Router} = express;
const passport = require("passport");
const prismaClient = require('@prisma/client');
const bcrypt = require('bcryptjs');

const router = Router();
const prisma = new prismaClient.PrismaClient();


router.get("/", (req, res) => {
    
    //check if user is authenticated
    if (req.isAuthenticated()) {
        return res.redirect("/home");
    }

    res.render("index")

});

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/home',
    failureRedirect: '/login',
}));

router.get('/signup', (req, res) => {
    res.render('signup');
});

router.post('/signup', async (req, res) => {
    const {email, password} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.create({
        data: {
            email,
            password: hashedPassword
        }
    });
    res.redirect('/login');
});