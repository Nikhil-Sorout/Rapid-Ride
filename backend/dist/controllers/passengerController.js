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
exports.signUpUser = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const passengerModel_1 = __importDefault(require("../models/passengerModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
// @desc Sign up a new passenger
// @route POST /api/passengers/signup
// @access public
const signUpUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const { userName, password, number, street, city, state, pincode, isDriver } = req.body.data;
    const email = req.body.email;
    try {
        console.log(userName);
        if (!userName || !password) {
            res.status(400).json({ message: "All mandatory fields are not filled !" });
        }
        const match = yield passengerModel_1.default.findOne({ number });
        if (match) {
            res.status(400).json({ message: "user already registered" });
        }
        console.log(password);
        const saltRounds = 10;
        const hashedPassword = yield bcrypt_1.default.hash(password, saltRounds);
        console.log(hashedPassword);
        const newUser = yield passengerModel_1.default.create({
            userName, password: hashedPassword, phone: number, street, city, state, pincode, isDriver, email
        });
        console.log(newUser);
        if (newUser) {
            res.status(200).json({ _id: newUser.id, name: newUser.userName, number: newUser.phone });
        }
        else {
            res.json({ err: "User data is invalid" }).status(400);
        }
    }
    catch (err) {
        console.log(err);
    }
});
exports.signUpUser = signUpUser;
