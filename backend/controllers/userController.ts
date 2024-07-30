import { Request, Response } from "express";
import axios from "axios";
import dotenv from 'dotenv';
dotenv.config();
import User from '../models/passengerModel'
import bcrypt from 'bcrypt'

// @desc Verify number
// @route GET /api/passengers/numberVerification
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

// @desc Sign up a new user
// @route POST /api/passengers/signup
// @access public
export const signupUser = async (req: Request, res: Response) => {
    console.log(req.body);
    const { userName, password, number, street, city, state, pincode} = req.body.data;
    const email = req.body.email;
    try {
        console.log(userName);
        if (!userName || !password) {
            res.status(400).json({ message: "All mandatory fields are not filled !" });
        }
        const match = await User.findOne({ number });
        if (match) {
            res.status(400).json({ message: "user already registered" });
        }
        console.log(password);
        const saltRounds: number | string = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        console.log(hashedPassword);
        const newUser = await User.create({
            userName, password: hashedPassword, phone: number, street, city, state, pincode, email
        })
        console.log(newUser);

        if (newUser) {
            res.status(200).json({ _id: newUser.id, name: newUser.userName, number: newUser.phone })
        }
        else {
            res.json({ err: "User data is invalid" }).status(400);
        }
    }
    catch (err) {
        console.log(err);
    }

}