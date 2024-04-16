import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import http from "http";
import pool from "./src/config/dbConfig.js"
import "dotenv/config";


const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// app.use("/api/v1", routes);

const port = process.env.PORT || 5000;

const server = http.createServer(app);

pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to database:', err);
      return;
    }
    console.log('Connected to MySQL database!');
    connection.release();
});


app.get('/', (req, res) => {
    res.send('Hello World!');
});

server.listen(port, () => {
    console.log('Server is running');
});