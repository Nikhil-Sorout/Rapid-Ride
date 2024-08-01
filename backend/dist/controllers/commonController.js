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
exports.signInUser = exports.verifyEmail = exports.verifyNumber = void 0;
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const passengerModel_1 = __importDefault(require("../models/passengerModel"));
const driverModel_1 = __importDefault(require("../models/driverModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// @desc Verify number
// @route GET /api/common/numberVerification
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
// @desc Verify email
// @route POST /api/common/emailVerification
// @access public
const verifyEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.query.email;
    console.log(email);
    const options = {
        method: 'GET',
        url: 'https://validect-email-verification-v1.p.rapidapi.com/v1/verify',
        params: {
            email: email
        },
        headers: {
            'x-rapidapi-key': process.env.RAPID_API_KEY,
            'x-rapidapi-host': 'validect-email-verification-v1.p.rapidapi.com'
        }
    };
    try {
        const response = yield axios_1.default.request(options);
        const data = response.data;
        // console.log(response.data);
        res.json(data).status(200);
    }
    catch (err) {
        console.log("Error on server side ", err);
    }
});
exports.verifyEmail = verifyEmail;
// @desc Sign in a user
// @route /api/common/signin
// @access public
const signInUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const { email, password } = yield req.body;
    try {
        const user = yield passengerModel_1.default.findOne({ email });
        if (user) {
            const match = yield bcrypt_1.default.compare(password, user.password);
            if (match) {
                const payload = {
                    passenger: {
                        id: user.id,
                        email: user.email
                    }
                };
                const accessToken = yield jsonwebtoken_1.default.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10d' });
                const refreshToken = yield jsonwebtoken_1.default.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '50d' });
                res.status(200).json({ isDriver: user.isDriver, accessToken: accessToken, refreshToken: refreshToken });
            }
            else {
                res.status(400).json({ message: "Invalid credentials" });
            }
        }
        else {
            const driver = yield driverModel_1.default.findOne({ email });
            if (driver) {
                const match = yield bcrypt_1.default.compare(password, driver.password);
                if (match) {
                    const payload = {
                        passenger: {
                            id: driver.id,
                            email: driver.email
                        }
                    };
                    const accessToken = yield jsonwebtoken_1.default.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10d' });
                    const refreshToken = yield jsonwebtoken_1.default.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '50d' });
                    res.status(200).json({ isDriver: driver.isDriver, accessToken: accessToken, refreshToken: refreshToken });
                }
                else {
                    res.status(400).json({ messgae: 'Invalid credentials' });
                }
            }
            else {
                res.status(404).json({ messgae: "Email not registered" });
            }
        }
    }
    catch (err) {
        console.log(err);
    }
});
exports.signInUser = signInUser;
