import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import connectDB from "./db/conection";
import dotenv from "dotenv";
dotenv.config({ path: `${__dirname}/../.env` });
import { initializeRoutes } from "./routs";
import path from "path";

const app = express();
connectDB();

//middlewares
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("dev"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("../../build"));
}
//routes
initializeRoutes(app);

const publicPath = path.join(__dirname, "..", "..", "build");
app.use(express.static(path.resolve(__dirname, "..", "..", "build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});
const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`server is up and running at port ${port}`));
