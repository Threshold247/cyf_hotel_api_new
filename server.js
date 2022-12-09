const express = require("express");
const app = express();
const port = 3001;

require("dotenv").config();

const { Pool } = require("pg");

const dbHost =
  process.env.DB_HOST ||
  "dpg-cdl9tvd3t39dil2doiu0-a.oregon-postgres.render.com";
//const isLocalDeploy = process.env.LOCAL_DEPLOY || true;

// Original code
const pool = new Pool({
  user: "test_w5vw_user",
  host: dbHost,
  database: "test_w5vw",
  password: "liXSwK3DEfLuj1GLR8d37wrve6Chyb2b",
  port: 5432,
});

console.log(dbHost);

// if (isLocalDeploy) {
//   pool = new Pool({
//     user: "cyf_hotel_user",
//     host: dbHost,
//     database: "cyf_hotel",
//     password: "ZSJsNLO8dv7A2R6mtgmdkGwXZqINIqDY",
//     port: 5432,
//     ssl: {
//       rejectUnauthorized: isLocalDeploy,
//     },
//   });
// } else {
//   pool = new Pool({
//     user: "cyf_hotel_user",
//     host: dbHost,
//     database: "cyf_hotel",
//     password: "ZSJsNLO8dv7A2R6mtgmdkGwXZqINIqDY",
//     port: 5432,
//   });
// }

// The Routes
app.get("/", function (req, res) {
  console.log(req.method, req.url);
  res.send("It works!");
});

app.get("/hotels", function (req, res) {
  console.log(req.method, req.originalUrl);
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
