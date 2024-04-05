import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Swal from "sweetalert2";
import Moment from "moment";
import StripeCheckout from "react-stripe-checkout";
import { Modal, Button } from "react-bootstrap";

const BookingScreen = () => {
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState();
  const [data,setData]=useState()
  const [room, setroom] = useState();
  const [bookingdate, setbookingdate] = useState("");
  const [show, setShow] = useState(true);
  const type = "medicine";
  let { roomsid,pack} = useParams();

  const date = new Date().getDate();
  const month = new Date().getMonth() + 1;
  const year = new Date().getFullYear();

  const [totalamount, settotalamount] = useState();

  useEffect(()=>{
    setData( JSON.parse(localStorage.getItem('myData')))
  
  },[])

  useEffect(() => {
    const fetchData = async () => {
      try {
        setloading(true);
        const data = (
          await axios.post("https://caregrid-medicine.vercel.app/api/rooms/getallroomsbyid", {
            roomsid: roomsid,
          })
        ).data;
        setroom(data.room);
        settotalamount(data.room.mrpperpack * pack);
        setbookingdate(date + "-" + month + "-" + year);
        //console.log(data.room);
        setloading(false);
      } catch (error) {
        seterror(true);
        console.log(error);
        setloading(false);
      }
    };
    fetchData();
  }, [roomsid]);


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  async function onToken(token) {
    console.log(token);
    const bookingDetails = {
      room,
      userid: data._id,
      pack,
      bookingdate,
      totalamount,
      type,
      token,
    };

    try {
      setloading(true);
      const result = await axios.post(
        "https://caregrid-medicine.vercel.app/api/booking/bookroom",
        bookingDetails
      );
      setloading(false);
      Swal.fire(
        "Congratulations",
        "Your medicine booked successfully",
        "success"
      ).then((result) => {
        if (result.value) {
          window.location.href = "/profile";
        }
      });
      console.log(result);
    } catch (error) {
      seterror(true);
      console.log(error);
      setloading(false);
      Swal.fire("Oops", "Something went wrong", "error");
    }
  }

  return (
    <div className="landing2">
      {loading ? (
        <Loader />
      ) : room ? (
        <Modal show={show} size="md">
          <Modal.Header closeButton>
            <Modal.Title>{room.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img className="d-block w-100 " src={room.imageurls[0]} />

            <p>{room.description}</p>

            <div className="col">
              <div>
                <h1>Booking Details</h1>
                <hr />
                <b>
                  <p>
                    Name :{data.firstName}
                  </p>
                  <p>MRP : &#x20A8; {room.mrpperpack}</p>
                  <p>Booking Date : {bookingdate}</p>
                  <p>Pack : {pack}</p>
                  <p>Total Amount : {totalamount}</p>
                </b>
              </div>
             
            </div>
          </Modal.Body>
          <Modal.Footer>
          <div>
                <StripeCheckout
                  amount={totalamount * 100}
                  token={onToken}
                  currency="INR"
                  stripeKey="pk_test_51MxSFxSDImWCEH67GxHRodFinMqg6arUcXOZcoQjski6DEibHE6cAbaqnabOkgKQKNVJ8zp8FInbZqR5Wfw7Gl5A00iJXbEUSW"
                >
                  <button className="btn btn-primary">Pay Now</button>
                </StripeCheckout>
              </div>
          </Modal.Footer>
        </Modal>
      ) : (
        <Error />
      )}
    </div>
  );
};

export default BookingScreen;
