import express from 'express'
import { verifyEmail } from '../controllers/driverController';

const router = express.Router();


router.route('/emailVerification').get(verifyEmail)

// router.route('/signup').post()

// router.route('/signin').post()

module.exports = router