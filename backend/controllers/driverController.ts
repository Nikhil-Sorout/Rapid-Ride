import { Response, Request } from "express"
import axios from "axios"
import dotenv from 'dotenv'
dotenv.config()
import bcrypt from 'bcrypt'
import Driver from '../models/driverModel'


// @desc Sign up drivers
// @route POST /api/drivers/signup
// @access public

export const singUpDriver = async(req:Request, res: Response)=>{
    console.log(req.body);
    const {userName, password, number, DLnumber, regNumber, modelName, isDriver} = req.body.data;
    const email = req.body.email;

    try{
        if(!userName || !password || !DLnumber || !regNumber)
        {
            res.status(400).json({message: "All fields are mandatory!"});
        }

        const match = await Driver.findOne({number});
        if(match)
        {
            res.status(400).json({message: "User already registered"})
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newDriver = await Driver.create({
            userName, password: hashedPassword, phone: number, dlNumber: DLnumber, registrationNumber: regNumber, model: modelName, isDriver, email
        })
        console.log(newDriver);
        if(newDriver)
        {
            res.status(200).json({_id: newDriver.id, name: newDriver.userName, phone: newDriver.phone});
        }
        else{
            res.json({err: "Driver data is invalid"}).status(400);
        }
    }
    catch(err)
    {
        console.log(err);
    }
    
}