import { Response, Request } from "express"
import axios from "axios"
import dotenv from 'dotenv'
dotenv.config()

// @desc Verify email
// @route POST /api/drivers/emailVerification
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

