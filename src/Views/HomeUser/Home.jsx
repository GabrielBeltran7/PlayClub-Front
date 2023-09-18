import { useEffect, useState } from "react";
import style from "./Home.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getUserByUsername, logoutUser, getCarrera, getCorredores,getcarreraActiva } from "../../Redux/Actions";

import React from "react";
import { AntDesignOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import Navbar from "../../Components/Navbar/Navbar";

const Home = () => {
  const dispatch = useDispatch();
  const usuario = useSelector((state) => state.user);
  
  const corredor = useSelector((state)=> state.corredor)
  const carrera = useSelector((state)=> state.carrera)
  const unicacarrera = useSelector((state)=>state.unicacarrera)

  const username = usuario ? usuario.username : null; // Cambiamos userId a username


  const [win, setWin] = useState({
    id:usuario.id,
    nombreapuesta:"",
    puesto1:"", 
    username: usuario.username,
    puntosapostados:"",
    puntosganados:""
  })

  const handlechangecarreraActiva = (event) => { 
    dispatch(getcarreraActiva(event.target.value));
    setWin({
      ...win,
      id:usuario.id,
      username:usuario.username,
      [event.target.name]: event.target.value
    })
  };
const handleChangewin =(event)=>{
  setWin({
    ...win,
    id:usuario.id,
    username:usuario.username,
    
    [event.target.name]: event.target.value
  })
}
const previewWin =()=>{
  const prueba = win.puntosapostados * unicacarrera.porcentajeWin /100
  return <p>{prueba}</p>
}

previewWin()
  const handleLogout = () => {
    localStorage.removeItem("username");
    dispatch(logoutUser());
  };
useEffect(()=>{
  dispatch(getCarrera())
  dispatch(getCorredores())
},[])
  useEffect(() => {
    // Verifica si existe un nombre de usuario en el almacenamiento local
    const storedUsername = localStorage.getItem("username"); // Cambiamos userId a username

    // Si hay un nombre de usuario almacenado localmente, úsalo
    if (storedUsername) {
      dispatch(getUserByUsername(storedUsername)); // Cambiamos la acción a getUserByUsername
    } else if (username) {
      // Si no hay un nombre de usuario almacenado localmente pero hay uno en el estado, guárdalo en el almacenamiento local
      localStorage.setItem("username", username); // Cambiamos userId a username
      console.log("username", username);
      dispatch(getUserByUsername(username)); // Cambiamos la acción a getUserByUsername
    }
  }, [dispatch, username]); // Cambiamos userId a username

  return (
    <div className={style.container}>
      {usuario.admin || usuario.subadmin ? (
        <div className={style.navbar}>
          <Navbar />
        </div>
      ) : (
        <></>
      )}
      <div className={style.containerInfoUser}>
        <div className={style.contendorUser}>
          <div className={style.infoUsuario}>
            <Avatar
              size={{
                xs: 24,
                sm: 32,
                md: 40,
                lg: 64,
                xl: 80,
                xxl: 100,
              }}
              src={usuario.imagen ? usuario.imagen : <AntDesignOutlined />}
            />
            <p>
              {usuario.username ? (
                usuario.username
              ) : (
                <p>
                  <a href="/login">Inicia sesion</a> o
                  <a href="/register"> registrate</a>
                </p>
              )}
            </p>
            <label>
              {usuario.id ? <p>Creditos:{usuario.cantidadtotal}</p> : ""}{" "}
            </label>
            <img
              src="https://cdn-icons-png.flaticon.com/128/566/566445.png"
              alt=""
              width="20"
              height="50"
            />
          </div>
          <div>
            {usuario.id ? (
              <button onClick={handleLogout}>Desloguear</button>
            ) : (
              ""
            )}
          </div>
        </div>

        <div>
          <img
            src="https://res.cloudinary.com/dou3yyisb/image/upload/v1694444797/PlayGame/logo-removebg_haqooq.png"
            alt=""
            width="300"
          />
        </div>
      </div>

      <select  className={style.avisoNoLogin} name='nombreapuesta'  onChange={handlechangecarreraActiva} >
            <option >Seleccione Carrera</option>
            {carrera.map(element => (

              <option key={element.id}  > {element.nombrecarrera}  {element.numero} </option>
            )
              ,)},
          </select> 
          
      <div className={style.formContainer}>
        


        <form>
          <h2>Win</h2>
          <label>Corredores</label>
          <label>Puesto 1</label>
          
          <select  name='puesto1' onChange={handleChangewin} >
            <option value="Select"></option>
            {corredor.map(element => (

              <option key={element.id}  > {element.nombre}  {element.numero} </option>
            )
              ,)},
          </select>
          
          <input type="number" placeholder="Ingrese monto a apostar" name="puntosapostados"  onChange={handleChangewin}/>
       <previewWin/>
          {/* <p >{unicacarrera.porcentajeWin ? win.puntosapostados * unicacarrera.porcentajeWin /100: "Selecciona una carrera"}</p> */}
          {usuario.id ? (

            
            <button>Enviar apuesta</button>
          ) : (
            <p className={style.avisoNoLogin}>
              <a href="/login">Inicia sesion</a> o
              <a href="/register"> registrate</a>
            </p>
          )}
        </form>








        <form>
          <h2>Exacta</h2>
          <label>Corredores</label>
          <label>Puesto 1</label>
          
          <select  name='win'  >
            <option value=""></option>
            {corredor.map(element => (

              <option key={element.id} value={element.id} > {element.nombre}  {element.numero} </option>
            )
              ,)},
          </select>
          <label>Puesto 2</label>
          <select  name='win'  >
            <option value=""></option>
            {corredor.map(element => (

              <option key={element.id} value={element.id} > {element.nombre}  {element.numero} </option>
            )
              ,)},
          </select>
          <input type="number" placeholder="Ingrese monto a apostar" />
          {usuario.id ? (
            <button>Enviar apuesta</button>
          ) : (
            <p className={style.avisoNoLogin}>
              <a href="/login">Inicia sesion</a> o
              <a href="/register"> registrate</a>
            </p>
          )}
        </form>
        <form>
          <h2>Trifecta</h2>
          <label>Corredores</label>
          <label>Puesto 1</label>
          <select  name='win'  >
            <option value=""></option>
            {corredor.map(element => (

              <option key={element.id} value={element.id} > {element.nombre}  {element.numero} </option>
            )
              ,)},
          </select>
          <label>Puesto 2</label>
          <select  name='win'  >
            <option value=""></option>
            {corredor.map(element => (

              <option key={element.id} value={element.id} > {element.nombre}  {element.numero} </option>
            )
              ,)},
          </select>
          <label>Puesto 3</label>
          <select  name='win'  >
            <option value=""></option>
            {corredor.map(element => (

              <option key={element.id} value={element.id} > {element.nombre}  {element.numero} </option>
            )
              ,)},
          </select>
          <input type="number" placeholder="Ingrese monto a apostar" />
          {usuario.id ? (
            <button>Enviar apuesta</button>
          ) : (
            <p className={style.avisoNoLogin}>
              <a href="/login">Inicia sesion</a> o
              <a href="/register"> registrate</a>
            </p>
          )}
        </form>
        <form>
          <h2>Superfecta</h2>
          <label>Corredores</label>
          <label>Puesto 1</label>
          <select  name='win'  >
            <option value=""></option>
            {corredor.map(element => (

              <option key={element.id} value={element.id} > {element.nombre}  {element.numero} </option>
            )
              ,)},
          </select>
          <label>Puesto 2</label>
          <select  name='win'  >
            <option value=""></option>
            {corredor.map(element => (

              <option key={element.id} value={element.id} > {element.nombre}  {element.numero} </option>
            )
              ,)},
          </select>
          <label>Puesto 3</label>
          <select  name='win'  >
            <option value=""></option>
            {corredor.map(element => (

              <option key={element.id} value={element.id} > {element.nombre}  {element.numero} </option>
            )
              ,)},
          </select>
          <label>Puesto 4</label>
          <select  name='win'  >
            <option value=""></option>
            {corredor.map(element => (

              <option key={element.id} value={element.id} > {element.nombre}  {element.numero} </option>
            )
              ,)},
          </select>
          <input type="number" placeholder="Ingrese monto a apostar" />
          {usuario.id ? (
            <button>Enviar apuesta</button>
          ) : (
            <p className={style.avisoNoLogin}>
              <a href="/login">Inicia sesion</a> o
              <a href="/register"> registrate</a>
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Home;
