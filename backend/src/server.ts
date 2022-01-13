import bodyParser from "body-parser";
import express from "express";
import connectDB from "./db/conection";
import dotenv from "dotenv";
dotenv.config({ path: `${__dirname}/../.env` });
import { initializeRoutes } from "./routs";

const app = express();
connectDB();

//middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

//routes
initializeRoutes(app);

app.get("/", function (req, res) {
  res.send("Hello welcome to my server");
});
const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`server is up and running at port ${port}`));
