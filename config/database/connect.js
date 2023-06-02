const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "mardonmominov35",
  database: "tst",
});

module.exports = pool;
pool.query("show tables", (error, result) => console.log(result));
