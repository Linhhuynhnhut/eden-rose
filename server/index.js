import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import http from "http";
import sequelize from "./src/config/dbConfig.js";
import "dotenv/config";
import routes from "./src/routes/index.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/v1", routes); 

const port = process.env.PORT || 5000;

const server = http.createServer(app);

sequelize.authenticate()
    .then(() => {
        console.log('Connected to the database!');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });


sequelize.sync({ force: true, logging: console.log }).then(() => {
  console.log("Database synchronized");
}).catch((error) => {
  console.error("Error synchronizing the database: ", error);
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
