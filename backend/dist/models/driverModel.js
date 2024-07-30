"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const driverSchema = new mongoose_1.default.Schema({
    userName: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    dlNumber: {
        type: String,
        required: true
    },
    registrationNumber: {
        type: String,
        required: true
    },
    model: {
        type: String
    },
    email: {
        type: String,
    }
});
module.exports = mongoose_1.default.model('Driver', driverSchema);
