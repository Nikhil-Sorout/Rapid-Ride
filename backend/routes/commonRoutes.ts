import express from 'express'
import { signInUser, verifyEmail, verifyNumber } from '../controllers/commonController';

const router = express.Router();

router.route('/emailVerification').get(verifyEmail)
router.route('/numberVerification').get(verifyNumber)
router.route('/signIn').post(signInUser)

module.exports = router;