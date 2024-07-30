"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const socket_io_1 = require("socket.io");
const dbConfig_1 = require("./config/dbConfig");
dotenv_1.default.config();
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const port = process.env.PORT || 5000;
(0, dbConfig_1.connectDb)();
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
app.use(body_parser_1.default.urlencoded({ extended: true }));
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "https://rapid-ride.vercel.app/",
        methods: ["GET", "POST"]
    }
});
io.on("connection", (socket) => {
    console.log("A user is connected");
});
app.use("/api/passengers", require('./routes/userRoutes'));
app.use("/api/drivers", require('./routes/driverRoutes'));
server.listen(port, () => {
    console.log("Server is running on: ", port);
});
