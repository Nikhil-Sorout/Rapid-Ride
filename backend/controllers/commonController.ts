import { Request, Response } from "express";
import axios from "axios";
import dotenv from 'dotenv';
dotenv.config();
import User from '../models/passengerModel'
import Driver from '../models/driverModel'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

// @desc Verify number
// @route GET /api/common/numberVerification
// @access public

export const verifyNumber = async (req: Request, res: Response) => {
    const number = req.query.number;
    console.log(number);

    const options = {
        method: 'GET',
        url: 'https://phonenumbervalidatefree.p.rapidapi.com/ts_PhoneNumberValidateTest.jsp',
        params: {
            number: number,
        },
        headers: {
            'x-rapidapi-key': process.env.RAPID_API_KEY,
            'x-rapidapi-host': 'phonenumbervalidatefree.p.rapidapi.com'
        }
    };
    try {
        const response = await axios.request(options);
        if (response.status == 200) {
            console.log(response.data);
            res.json(response.data).status(200);
        }
    }
    catch (err) {
        console.log(err);
    }
}

// @desc Verify email
// @route POST /api/common/emailVerification
// @access public
export const verifyEmail = async (req: Request, res: Response) => {
    const email = req.query.email;
    console.log(email);
    const options = {
        method: 'GET',
        url: 'https://validect-email-verification-v1.p.rapidapi.com/v1/verify',
        params: {
            email: email
        },
        headers: {
            'x-rapidapi-key': process.env.RAPID_API_KEY,
            'x-rapidapi-host': 'validect-email-verification-v1.p.rapidapi.com'
        }
    };
    try {
        const response = await axios.request(options);
        const data = response.data;
        // console.log(response.data);
        res.json(data).status(200);

    }
    catch (err) {
        console.log("Error on server side ", err);
    }
};

// @desc Sign in a user
// @route /api/common/signin
// @access public

export const signInUser = async (req: Request, res: Response) => {
    console.log(req.body);
    const { email, password } = await req.body;
    try {
        const user = await User.findOne({ email });
        if (user) {
            const match = await bcrypt.compare(password, user.password);
            if (match) {
                const payload = {
                    passenger: {
                        id: user.id,
                        email: user.email
                    }
                }

                const accessToken = await jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: '10d' })
                const refreshToken = await jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET!, { expiresIn: '50d' })
                res.status(200).json({ isDriver: user.isDriver, accessToken: accessToken, refreshToken: refreshToken });
            }
            else {
                res.status(400).json({ message: "Invalid credentials" })
            }
        }
        else {
            const driver = await Driver.findOne({ email });
            if (driver) {
                const match = await bcrypt.compare(password, driver.password);
                if (match) {

                    const payload = {
                        passenger: {
                            id: driver.id,
                            email: driver.email
                        }
                    }

                    const accessToken = await jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: '10d' })
                    const refreshToken = await jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET!, { expiresIn: '50d' })
                    res.status(200).json({ isDriver: driver.isDriver, accessToken: accessToken, refreshToken: refreshToken });
                }
                else {
                    res.status(400).json({ messgae: 'Invalid credentials' })
                }
            }
            else {
                res.status(404).json({ messgae: "Email not registered" });
            }
        }
    }
    catch (err) {
        console.log(err);
    }
}