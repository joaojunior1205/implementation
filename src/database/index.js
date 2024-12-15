require('dotenv').config();
const { DataSource } = require("typeorm");
const path = require("path");

const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.POSTGRES_HOST || "localhost",
    port: process.env.POSTGRES_PORT || 5435,
    username: process.env.POSTGRES_USER || "root",
    password: process.env.POSTGRES_PASSWORD || "admin",
    database: process.env.POSTGRES_DB || "test",
    entities: [path.join(__dirname, "./models/**/*.js")],
    migrations: [path.join(__dirname, "./migrations/*.js")],
    synchronize: false,
    logging: false,
});

module.exports = AppDataSource;