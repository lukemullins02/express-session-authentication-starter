const { Pool } = require("pg");

require("dotenv").config();

/**
 * -------------- DATABASE ----------------
 */

const pool = new Pool({
  host: "localhost",
  user: `${process.env.USERNAME}`,
  database: `${process.env.DB}`,
  password: `${process.env.PASSWORD}`,
  port: 5432,
});

module.exports = pool;
