const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
//connect

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "readingsdb",
  multipleStatements: true,
});
const app = express();
let port = 3001;

app.use(express.json());
app.use(cors());
app.use(express.static("public"));

app.use(express.static("uploads"));

let config = {
  // ...
  timezone: "UTC",
  dateStrings: ["DATE", "DATETIME"],
};

let pool = mysql.createPool(config);
pool.on("connection", (conn) => {
  conn.query("SET time_zone='+00:00';", (error) => {
    if (error) {
      throw error;
    }
  });
});

app.post("/data/:temp/:time", async (req, res) => {
  //add to db
  let data = {
    temperature: req.params.temp,
    time: req.params.time,

    date: new Date().toISOString().split("T")[0],
  };
  let sql = "INSERT INTO data SET ?";
  let signupQuery = db.query(sql, data, (err, result) => {
    try {
      if (err) throw err;
      else {
        res.json({ result });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  });
});
app.get("/data", async (req, res) => {
  //get db data
  let sql = `SELECT * FROM data`;

  let getQuery = db.query(sql, (err, result) => {
    if (err) throw err;
    else {
      res.json({ data: result });
    }
  });
});

app.get("/data/report/:date", async (req, res) => {
  //get db data
  let sql = `SELECT * FROM data WHERE date = '${req.params.date}' ORDER BY temperature DESC LIMIT 1`;

  let sql2 = `SELECT * FROM data  WHERE date = '${req.params.date}' ORDER BY temperature ASC LIMIT 1`;
  var report = {};
  let getQuery = db.query(sql, (err, result) => {
    if (err) throw err;
    else {
      report.highest = result[0];

      let getQuery = db.query(sql2, (err, result) => {
        if (err) throw err;
        else {
          report.lowest = result[0];
          res.json({ data: report });
        }
      });
    }
  });
});
app.listen(port, () => {
  console.log("Listening on port " + port);
});
