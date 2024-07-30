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
exports.signupUser = exports.verifyNumber = void 0;
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const passengerModel_1 = __importDefault(require("../models/passengerModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
// @desc Verify number
// @route GET /api/passengers/numberVerification
// @access public
const verifyNumber = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const number = req.query.number;
    console.log(number);
    const options = {
        method: 'GET',
        url: 'https://phonenumbervalidatefree.p.rapidapi.com/ts_PhoneNumberValidateTest.jsp',
        params: {
            number: number,
        },
        headers: {
            'x-rapidapi-key': process.env.RAPID_API_KEY,
            'x-rapidapi-host': 'phonenumbervalidatefree.p.rapidapi.com'
        }
    };
    try {
        const response = yield axios_1.default.request(options);
        if (response.status == 200) {
            console.log(response.data);
            res.json(response.data).status(200);
        }
    }
    catch (err) {
        console.log(err);
    }
});
exports.verifyNumber = verifyNumber;
// @desc Sign up a new user
// @route POST /api/passengers/signup
// @access public
const signupUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const { userName, password, number, street, city, state, pincode } = req.body.data;
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
            userName, password: hashedPassword, phone: number, street, city, state, pincode, email
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
exports.signupUser = signupUser;
