const express = require("express");
const path = require("path");
const cors = require("cors");
const mysql = require("mysql");
const app = express();
const port = 8080;

app.use(cors());

const connection = mysql.createConnection({
  host: "9123-express-sql.mysql.database.azure.com",
  user: "L6TUS",
  password: "Salasana1234",
  port: 3306,
  ssl: { rejectUnauthorized: false },
  database: `azure-express-table`,
});

connection.connect((err) => {
  if (err) {
    console.log("error:", err);
  } else {
    console.log("works well works nice");
  }
});

app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello there mister!" });
});

app.get("/api/chicken", (req, res) => {
  res.json({ message: "chicken" });
});

// Mysql api example

app.get("/api/mysql", (req, res) => {
  connection.query("SELECT * FROM `azure-services`;", (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Serve react build folder

app.use(express.static(path.join(__dirname, "client/dist")));

// React routing support
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "client/dist", "index.html"));
});
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
