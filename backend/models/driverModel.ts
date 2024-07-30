import mongoose from "mongoose";

const driverSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
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
    email: {
        type: String,
    }
})

module.exports = mongoose.model('Driver', driverSchema)