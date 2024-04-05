import React, { useState } from "react";
import { Modal, Button, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";

function Room({ rooms }) {
  const [show, setShow] = useState(false);
  const [pack, setPack] = useState(1);

  const increaseCount = () => {
    setPack(pack + 1);
  };

  const decreaseCount = () =>{
    if(pack > 1) {
    setPack(pack - 1);
    }
  }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="row bs">
      <div className="row-md-2" style={{ width: "100%" }}>
        <img  onClick={handleShow} src={rooms.imageurls[0]} className="smallimg" />
      </div>
      <div className="row-md-2 mt-3">
        <h1>{rooms.name.substring(0, 13)+'...'}</h1>
        <b>
          {""}
          <p>
            <b>MRP : &#x20A8; {rooms.mrpperpack}</b>
          </p>
        </b>
       
      </div>
      <div className="col med">
          <div>
            {
              <Link to={`/book/${rooms._id}/${pack}`}>
                <button className="btn btn-primary"> Book Now</button>
              </Link>
               /* <button className='btn btn-primary' onClick={handleShow}> View Details</button> */
            }
          </div>

          <div style={{border:'1px solid black' , display:'flex' , justifyContent:'space-evenly'}}>
            
            <h6 style={{margin:'3px 5px 0px 3px'}}> <b>{pack}</b> </h6>
            <div style={{display:'grid'}}>
            <button  className="btn1 " onClick={increaseCount}>+</button>
            <button  className="btn1 " onClick={decreaseCount}>-</button>
            </div>
            
          </div>
        </div>

        <Modal show={show} onHide={handleClose} size='lg'>
        <Modal.Header >
          <Modal.Title>{rooms.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
            {rooms.imageurls.map(url =>{
              return (
                <img
                  className="d-block w-100 " 
                  src={url}
                  alt="First slide"
                />
              )

            })}
          
          
        <p>
          {rooms.description}
        </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Room;
