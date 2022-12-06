const express = require("express");
const app = express();
const port = 3001;

const { Pool } = require("pg");
const dbHost =
  process.env.DB_HOST ||
  "dpg-ce5gfckgqg49410a5dn0-a.oregon-postgres.render.com";

// const connectionString =
//   "postgres://cyf_hotel_user:ZSJsNLO8dv7A2R6mtgmdkGwXZqINIqDY@dpg-ce5gfckgqg49410a5dn0-a.oregon-postgres.render.com/cyf_hotel";
// pool = new Pool({
//   connectionString,
//   ssl: {
//     rejectUnauthorized: true,
//   },
// });
console.log(dbHost);
const pool = new Pool({
  user: "cyf_hotel_user",
  host: dbHost,
  database: "cyf_hotel",
  password: "ZSJsNLO8dv7A2R6mtgmdkGwXZqINIqDY",
  port: 5432,
  ssl: {
    rejectUnauthorized: true,
  },
});

app.get("/hotels", function (req, res) {
  console.log(req.method, req.url);
  pool
    .query("SELECT * FROM hotels")
    .then((result) => res.json(result.rows))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
});

app.listen(3001, function () {
  console.log(`Server is listening on port ${port}. Ready to accept requests!`);
});
