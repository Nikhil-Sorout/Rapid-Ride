import { Request, Response } from "express";
import axios from "axios";
import dotenv from 'dotenv';
dotenv.config();
import User from '../models/passengerModel'
import bcrypt from 'bcrypt'

// @desc Sign up a new passenger
// @route POST /api/passengers/signup
// @access public
export const signUpUser = async (req: Request, res: Response) => {
    console.log(req.body);
    const { userName, password, number, street, city, state, pincode, isDriver} = req.body.data;
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
            userName, password: hashedPassword, phone: number, street, city, state, pincode, isDriver, email
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

// @desc search location
// @route GET /api/passengers/searchLocation
// @access private

export const seachLocation = async(req: Request, res:Response)=>{
    console.log(req.query);
    const {search} = req.query;
    try{
        const response = await axios.get('https://api.mapbox.com/search/searchbox/v1/forward',
            {
                params:{
                    q: search,
                    access_token: process.env.MAP_BOX_TOKEN,
                    limit: 5
                }
            }
        )
        if(response.status==200){
            res.status(200).json(response.data);
        }
    }
    catch(err)
    {
        console.log(err);
    }
}