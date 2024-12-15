const express = require("express");
const router = require("./routes/router");
const AppDataSource = require("./database");

const app = express();

AppDataSource
    .initialize()
    .then(() => console.log("database - initialized successfully"))
    .catch((err) => console.error("database - error initialized", err))

app.use(express.json())
app.use("/api/1/", router);

module.exports = app;