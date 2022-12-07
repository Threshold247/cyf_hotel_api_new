const express = require("express");
const app = express();
const port = 3001;

require("dotenv").config();

const { Pool } = require("pg");

const dbHost =
  process.env.DB_HOST ||
  "dpg-ce5gfckgqg49410a5dn0-a.oregon-postgres.render.com";
const isLocalDeploy = process.env.LOCAL_DEPLOY || true;

// const connectionString =
//   "dpg-ce5gfckgqg49410a5dn0-a.oregon-postgres.render.com";
// pool = new Pool({
//   connectionString,
//   ssl: {
//     rejectUnauthorized: true,
//   },
// });
console.log(dbHost);

// if (isLocalDeploy) {
//   config = {
//     user: "cyf_hotel_user",
//     host: dbHost,
//     database: "cyf_hotel",
//     password: "ZSJsNLO8dv7A2R6mtgmdkGwXZqINIqDY",
//     port: 5432,
//     ssl: {
//       rejectUnauthorized: isLocalDeploy,
//     },
//   };
// } else {
//   config = {
//     user: "cyf_hotel_user",
//     host: dbHost,
//     database: "cyf_hotel",
//     password: "ZSJsNLO8dv7A2R6mtgmdkGwXZqINIqDY",
//     port: 5432,
//   };
// }

// The Routes
app.get("/"),
  function (req, res) {
    console.log(req.method);
    res.send("It works!");
  };

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
