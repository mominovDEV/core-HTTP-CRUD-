const mysql = require("mysql");

const pool = mysql.createPool({
  host:'localhost',
  user:'root',
  password:'checkhack__01',
  database:'homework',
  connectionLimit:100
})

module.exports = pool;