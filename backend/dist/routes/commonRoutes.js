"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const commonController_1 = require("../controllers/commonController");
const router = express_1.default.Router();
router.route('/emailVerification').get(commonController_1.verifyEmail);
router.route('/numberVerification').get(commonController_1.verifyNumber);
router.route('/signIn').post(commonController_1.signInUser);
module.exports = router;
