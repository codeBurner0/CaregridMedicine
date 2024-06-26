import { Router } from "express";
const router = Router();
import Booking from '../models/booking'
//const Booking = require('../models/booking')
import Room from "../models/medicine";
import { v4 as uuidv4 } from 'uuid';
//const stripe = require('stripe')('sk_test_51MxSFxSDImWCEH67YT4K9A0fUxM5TBBmix99aNxOi1JPjitzK07zMfYPUQt3m06WGyVanT85yR2n7rOGoNCMyyWy00OIq7y6Tw')
import Stripe from 'stripe';
import booking from "../models/booking";
const stripe = new Stripe('sk_test_51MxSFxSDImWCEH67YT4K9A0fUxM5TBBmix99aNxOi1JPjitzK07zMfYPUQt3m06WGyVanT85yR2n7rOGoNCMyyWy00OIq7y6Tw');


router.post("/bookroom", async (req, res) => {
  const { room, userid, pack ,bookingdate , totalamount, type,token} = req.body
   
  try{
    console.log('1st')
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id
    })

    const payment = {
      amount: totalamount * 100,
      currency: 'usd',
      customer: customer.id,
      idempotency_key: uuidv4()
    }

     if(payment){
  
        const  newbooking = new Booking({
          room: room.name,
          roomid: room._id,
          mrpperpack : room.mrpperpack,
          pack : pack,
          userid : userid,
          bookingdate: bookingdate,
          totalamount : totalamount,
          transactionId: '1234',
          type : type,
          detail : token
        })
        const booking = await newbooking.save();
    
        const roomtemp = await Room.findOne({ _id: room._id });
    
        roomtemp.currentbookings.push({ bookingid: booking._id, bookingdate: bookingdate, userid: userid  , Payamount : totalamount,  type : type ,details : token , status : booking.status});
        console.log(roomtemp)
        await roomtemp.save();
        //res.send("Room booked ")
      }
    res.send('Payment Successful , Your room is booked')
  }
  catch(error){
    console.log('uffff')
    return res.status(400).json({error})
  }
});

router.post("/getbookingsbyuserid" ,async (req,res)=>{
  const userid = req.body.userid;

  try{
    const bookings = await Booking.find({userid:userid})
    res.send(bookings)
  }
  catch(err){
    return res.status(200).json({err})
    console.log(err)
  }
});

router.post("/cancelbooking" ,async (req,res)=>{

  const {bookingid , roomid} = req.body;

  try{
    const bookingitem = await Booking.findOne({_id:bookingid})
    bookingitem.status = 'cancelled'
    await bookingitem.save()
    const room = await Room.findOne({_id : roomid})

    const bookings = room.currentbookings

    const temp = bookings.filter(booking => booking.bookingid.toString() !== bookingid)
    room.currentbookings = temp 

    await room.save()
    res.send('Your booking cancelled successfully')
  }
  catch(err){
    return res.status(200).json({err})
    console.log(err)
  }
});

router.post("/getallbookings" ,async (req,res)=>{

 // const {bookingid , roomid} = req.body;

  try{
    const bookings = await Booking.find()
    res.send(bookings)
  }
  catch(err){
    return res.status(200).json({err})
    console.log(err)
  }
});


export default router;
