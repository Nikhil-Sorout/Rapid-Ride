"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const pusher_1 = __importDefault(require("pusher"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
const pusher = new pusher_1.default({
    appId: process.env.APP_ID || '',
    key: process.env.APP_KEY || '',
    secret: process.env.APP_SECRET || '',
    cluster: process.env.APP_CLUSTER || '',
});
app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send(`Hey I am here`);
    // console.log(res);
}));
// for authenticating users
app.get('/pusher/auth', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    const socketId = query.socket_id;
    const channel = query.channel_name;
    const callback = query.callback;
    const auth = JSON.stringify(pusher.authenticate(socketId, channel));
    const cb = callback.replace(/\"/g, "") + "(" + auth + ");";
    res.set({
        "Content-Type": "application/javascript"
    });
    res.send(cb);
}));
app.listen(port, () => {
    console.log("Server is running on: ", port);
});
