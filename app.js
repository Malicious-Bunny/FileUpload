const express = require("express");
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const expressSession = require('express-session');
const { PrismaSessionStore } = require('@quixo3/prisma-session-store');
const { PrismaClient } = require('@prisma/client');
const path = require('path');
const authRouter = require('./routes/auth');
const homeRouter = require('./routes/home');
const folderRouter = require('./routes/folder');
const logger = require('morgan');

const app = express();
app.set("views", path.join(__dirname, "views"));
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.use(
    expressSession({
      cookie: {
       maxAge: 7 * 24 * 60 * 60 * 1000 // ms
      },
      secret: 'a santa at nasa',
      resave: true,
      saveUninitialized: true,
      store: new PrismaSessionStore(
        new PrismaClient(),
        {
          checkPeriod: 2 * 60 * 1000,  //ms
          dbRecordIdIsSessionId: true,
          dbRecordIdFunction: undefined,
        }
      )
    })
  );

require('./config/passport')

app.use(passport.session());
app.use(express.urlencoded({ extended: false }));



app.use('/', authRouter);
app.use('/home', homeRouter);
app.use('/folder', folderRouter);

app.listen(3000, () => console.log("Server is running at link: http://localhost:3000"));
