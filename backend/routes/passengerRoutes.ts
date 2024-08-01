import express from 'express'
import {signUpUser} from '../controllers/passengerController';

const router = express.Router();

router.route('/signup').post(signUpUser)

module.exports = router