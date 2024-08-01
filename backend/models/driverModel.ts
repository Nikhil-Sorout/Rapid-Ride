import mongoose from "mongoose";

const driverSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    dlNumber:{
        type: String,
        required: true
    },
    registrationNumber:{
        type: String,
        required: true
    },
    model:{
        type: String
    },
    isDriver:{
        type: Boolean,
        required: true
    },
    email: {
        type: String,
        unique: true
    }
})

export default mongoose.model('Driver', driverSchema)