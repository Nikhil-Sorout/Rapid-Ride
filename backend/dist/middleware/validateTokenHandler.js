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
exports.validateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const validateToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('token validation begins....');
    const authHeader = yield req.get('authorization');
    if (!authHeader) {
        res.status(401).json({ message: "No token provided" });
    }
    const token = authHeader.split(' ')[1];
    if (!token) {
        res.status(401).json({ messgae: "Token format is invalid" });
    }
    jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            res.status(401).json({ message: "Unauthorized access" });
        }
        // console.log(decoded);
        // req.user = decoded.user;
        console.log("token validated successfully....c");
        next();
    });
    // req.token = token;
});
exports.validateToken = validateToken;
