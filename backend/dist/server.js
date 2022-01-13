"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const conection_1 = __importDefault(require("./db/conection"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: `${__dirname}/../.env` });
const app = (0, express_1.default)();
(0, conection_1.default)();
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.get("/", function (req, res) {
    res.send("Hello welcome to my server");
});
const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`server is up and running at port ${port}`));
