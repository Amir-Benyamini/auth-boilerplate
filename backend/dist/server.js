"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const conection_1 = __importDefault(require("./db/conection"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: `${__dirname}/../.env` });
const routs_1 = require("./routs");
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
(0, conection_1.default)();
//middlewares
app.use((0, cors_1.default)());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.use((0, morgan_1.default)("dev"));
if (process.env.NODE_ENV === "production") {
    app.use(express_1.default.static("../../build"));
}
//routes
(0, routs_1.initializeRoutes)(app);
const publicPath = path_1.default.join(__dirname, "..", "..", "build");
app.use(express_1.default.static(path_1.default.resolve(__dirname, "..", "..", "build")));
app.get("*", (req, res) => {
    res.sendFile(path_1.default.join(publicPath, "index.html"));
});
const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`server is up and running at port ${port}`));
