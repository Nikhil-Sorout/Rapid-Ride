import express from 'express'
import { signupUser, verifyNumber } from '../controllers/userController';

const router = express.Router();

router.route('/numberVerification').get(verifyNumber)
router.route('/signup').post(signupUser)

module.exports = router