import express from 'express'
import {seachLocation, signUpUser} from '../controllers/passengerController';
import { validateToken } from '../middleware/validateTokenHandler';

const router = express.Router();

router.route('/signup').post(signUpUser)
router.use(validateToken)
router.route('/searchLocation').get(seachLocation)

module.exports = router