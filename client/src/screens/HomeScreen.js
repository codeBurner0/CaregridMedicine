import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Room from '../components/Room';
import Loader from '../components/Loader';
import Error from '../components/Error';
import moment from 'moment'
import 'antd/dist/reset.css';



const HomeScreen = () => {

  const [rooms, setData] = useState([])
  const [loading, setloading] = useState();
  const [error, seterror] = useState()
  const [duplicaterooms, setduplicaterooms] = useState([]);
  const [searchkey , setsearchkey] = useState('');
  const [ type , settype ] = useState('all')

  useEffect(() => {
    const fetchData = async () => {
      try {
        setloading(true)
        const data = (await axios.get('https://caregrid-medicine.vercel.app/api/rooms/getallrooms')).data

        setData(data.rooms)
        setduplicaterooms(data.rooms)
        //console.log(data);
        setloading(false)

      } catch (error) {
        seterror(true)
        console.log(error);
        setloading(false)
      }
    };
    fetchData();
  }, []);


  function filterBySearch(){
    const temprooms = duplicaterooms.filter(rooms => rooms.name.toLowerCase().includes(searchkey.toLowerCase()));
    
    setData(temprooms)
    if(rooms.length === 0){
      <Loader />
    }
  }


  return (
    <div className='landing1 m-0' >
      <div className='row bs '  >
       <div className='col-md-9'></div>

        <div className='col-md-3' >
          <input type="text" className='form-control' placeholder='&#x1F50D; search medicine' style={{marginTop:'1px' , float:'right'}}
            value ={searchkey} onChange={(e) => setsearchkey(e.target.value)} onKeyUp={filterBySearch}
          />
        </div>

      </div>


      <div className='row justify-content-center mt-3'>
        {loading ? (<Loader />) : (rooms.map((rooms) => {
          return <div className='col-md-2 m-2'>
            <Room rooms={rooms} />
          </div>
        })
        ) }
      </div>
    </div>
  );
}

export default HomeScreen;
