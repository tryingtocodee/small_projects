"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const urlRoutes_1 = __importDefault(require("./routes/urlRoutes"));
const dbConnect_1 = __importDefault(require("./db_config/dbConnect"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: "http://localhost:8080",
    credentials: true
}));
app.use("/api/auth", authRoutes_1.default);
app.use("/api/url", urlRoutes_1.default);
app.listen(port, () => {
    (0, dbConnect_1.default)();
    console.log("server is running on port", port);
});
