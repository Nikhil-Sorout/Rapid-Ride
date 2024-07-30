"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const driverController_1 = require("../controllers/driverController");
const router = express_1.default.Router();
router.route('/emailVerification').get(driverController_1.verifyEmail);
// router.route('/signup').post()
// router.route('/signin').post()
module.exports = router;
