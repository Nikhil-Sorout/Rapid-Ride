import express from 'express'
import { singUpDriver } from '../controllers/driverController';


const router = express.Router();

router.route('/signup').post(singUpDriver)

// router.route('/signin').post()

module.exports = router