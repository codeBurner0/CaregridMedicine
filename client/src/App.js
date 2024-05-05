import "./App.css";
import { useState, useEffect } from "react";
import NavBar from "./components/NavBar";
import {
  BrowserRouter,
  Route,
  Routes,
  Link,
  useNavigate
} from "react-router-dom";
import HomeScreen from './screens/HomeScreen';
import BookingScreen from './screens/BookingScreen';
import ProfileScreen from './screens/ProfileScreen';
import AdminScreen from './screens/AdminScreen';

function App() {
  const navigate=useNavigate()
   const [data, setData] = useState((localStorage.getItem("myData"))?JSON.parse(localStorage.getItem("myData")):{
    _id: "660430fe74d07d6ebaba919f",
    firstName: " ",
    lastName: "Anand",
    email: "ankit@gmail.com",
    phone: 7078259655,
    __v: 0,
  });
  useEffect( () => {
    const params = new URLSearchParams(window.location.search);
    const dataFromFirstApp = params.get("data");
    if (dataFromFirstApp) {
      localStorage.clear();
        console.log("internal");
        localStorage.setItem("myData", dataFromFirstApp);
        setData(JSON.parse(localStorage.getItem("myData")));
        navigate("/home");
    }
  }, []);

  return (
    <div className="App">
      <NavBar name={data.firstName} />

      <Routes>
        <Route path="/home" exact element={<HomeScreen />} />
        <Route
          path="/book/:roomsid/:pack"
          element={<BookingScreen />}
        />

        <Route
          path="/profile"
          element={
            <ProfileScreen
              name={data.firstName}
              phone={data.phone}
              email={data.email}
            />
          }
        />
       
        <Route path="/admin" element={<AdminScreen />}></Route>
        <Route path="/" element={<HomeScreen />}></Route>
      </Routes>
    </div>
  );
}

export default App;
