import { useState, useEffect } from "react";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import Landing from "./Views/Landing/Landing";
import Register from "./Components/Register/Register";
import Login from "./Components/login/Login";
import Home from "./Views/HomeUser/Home";
import HomeAdmin from "./Views/HomeAdmin/HomeAdmin";
import HomeSubAdmin from "./Views/HomeSubAdmin/HomeSubAdmin";
import CargaPuntosUser from "./Components/CargarPuntosUser/CargaPuntosUser";
import GanadoresCarrera from "./Components/GanadoresCarrera/GanadoresCarrera";
import CustomModal from "./Components/RecuperarContraseña/CustomModal";
import { useSelector } from "react-redux";
//axios.defaults.baseURL = "https://win123.onrender.com/";
axios.defaults.baseURL = "http://localhost:3001/";
function App() {
  const user = useSelector((state) => state.user);

  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/CustomModal" element={<CustomModal />} />
        <Route path="/GanadoresCarrera" element={<GanadoresCarrera />} />
        <Route path={`/homeadmin/:username`} element={<HomeAdmin />} />
        {/* <Route path="/homeadmin/" element={<HomeAdmin  />} /> */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/cargapuntos/:id"
          element={user.admin || user.subadmin ? <CargaPuntosUser /> : <Home />}
        />
        <Route path="/home/subadmin/" element={<HomeSubAdmin />} />
      </Routes>
    </div>
  );
}

export default App;
