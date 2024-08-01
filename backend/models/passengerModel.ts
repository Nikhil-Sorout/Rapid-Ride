import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
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
    street:{
        type: String,
        required: true
    },
    city:{
        type: String,
        required: true
    },
    state:{
        type: String,
        required: true
    },
    pincode:{
        type: String,
        required: true
    },
    isDriver:{
        type: Boolean,
        required: true
    },
    email:{
        type: String,
        unique: true
    },
})

export default mongoose.model('User', userSchema);
