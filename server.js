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


app.listen(port, () => {
  console.log("Listening on port " + port);
});
