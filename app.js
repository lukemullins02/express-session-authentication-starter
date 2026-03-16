const express = require("express");
const session = require("express-session");
var passport = require("passport");
var crypto = require("crypto");
var routes = require("./routes");
const pg = require("pg");
const pool = require("./config/database");

const PGStore = require("connect-pg-simple")(session);

// Need to require the entire Passport config module so app.js knows about it
var app = express();

require("./config/passport");

/**
 * -------------- GENERALit SETUP ----------------
 */

// Gives us access to variables set in the .env file via `process.env.VARIABLE_NAME` syntax
require("dotenv").config();

// Create the Express application

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * -------------- SESSION SETUP ----------------
 */

// TODO
const sessionStore = new PGStore({ pool: pool, tableName: "sessions" });
/**
 * -------------- PASSPORT AUTHENTICATION ----------------
 */

app.use(
  session({
    store: sessionStore,
    secret: "some secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  }),
);

app.use(passport.initialize());
app.use(passport.session());

/**
 * -------------- ROUTES ----------------
 */

// Imports all of the routes from ./routes/index.js
app.use(routes);

/**
 * -------------- SERVER ----------------
 */

// Server listens on http://localhost:3000
app.listen(3000);
