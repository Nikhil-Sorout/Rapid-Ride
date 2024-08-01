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
exports.singUpDriver = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const bcrypt_1 = __importDefault(require("bcrypt"));
const driverModel_1 = __importDefault(require("../models/driverModel"));
// @desc Sign up drivers
// @route POST /api/drivers/signup
// @access public
const singUpDriver = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const { userName, password, number, DLnumber, regNumber, modelName, isDriver } = req.body.data;
    const email = req.body.email;
    try {
        if (!userName || !password || !DLnumber || !regNumber) {
            res.status(400).json({ message: "All fields are mandatory!" });
        }
        const match = yield driverModel_1.default.findOne({ number });
        if (match) {
            res.status(400).json({ message: "User already registered" });
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const newDriver = yield driverModel_1.default.create({
            userName, password: hashedPassword, phone: number, dlNumber: DLnumber, registrationNumber: regNumber, model: modelName, isDriver, email
        });
        console.log(newDriver);
        if (newDriver) {
            res.status(200).json({ _id: newDriver.id, name: newDriver.userName, phone: newDriver.phone });
        }
        else {
            res.json({ err: "Driver data is invalid" }).status(400);
        }
    }
    catch (err) {
        console.log(err);
    }
});
exports.singUpDriver = singUpDriver;
