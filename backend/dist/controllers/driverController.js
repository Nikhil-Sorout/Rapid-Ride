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
exports.verifyEmail = void 0;
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// @desc Verify email
// @route POST /api/drivers/emailVerification
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
