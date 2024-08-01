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
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
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
    isDriver: {
        type: Boolean,
        required: true
    },
    email: {
        type: String,
        unique: true
    }
});
exports.default = mongoose_1.default.model('Driver', driverSchema);
