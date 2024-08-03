"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passengerController_1 = require("../controllers/passengerController");
const validateTokenHandler_1 = require("../middleware/validateTokenHandler");
const router = express_1.default.Router();
router.route('/signup').post(passengerController_1.signUpUser);
router.use(validateTokenHandler_1.validateToken);
router.route('/searchLocation').get(passengerController_1.seachLocation);
module.exports = router;
