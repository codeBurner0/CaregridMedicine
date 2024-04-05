//const mongoose = require('mongoose')
import mongoose, { model, Schema } from "mongoose";

const medicineSchema = mongoose.Schema({
    name:{
        type : String, required: true
    },
    mrpperpack :{
        type: Number , required: true
    },
    imageurls:[],
    currentbookings :[],
    description:{
        type: String , required:true
    }
},{
    timestamps :true
})

export default model('medicine' , medicineSchema)


// const roomModel = mongoose.model('room' , roomSchema)
// module.exports = roomModel