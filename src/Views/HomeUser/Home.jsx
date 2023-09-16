import { useEffect } from "react";
import style from "./Home.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getUserByUsername, logoutUser } from "../../Redux/Actions";
import React from "react";
import { AntDesignOutlined } from "@ant-design/icons";
import { Avatar } from "antd";

const Home = () => {
  const dispatch = useDispatch();
  const usuario = useSelector((state) => state.user);
  console.log("el LOGUEO  HOME", usuario);
  const username = usuario ? usuario.username : null; // Cambiamos userId a username

 
  const handleLogout = () => {
    localStorage.removeItem("username"); 
    dispatch(logoutUser()); 
  };

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
      <button onClick={handleLogout}>Desloguear</button>
      <div className={style.containerInfoUser}>
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
            src={usuario.imagen? usuario.imagen:<AntDesignOutlined />}
          
          />
          <label>{usuario.username}</label>
          <label>Creditos:{usuario.cantidadtotal}</label>
          <img
            src="https://cdn-icons-png.flaticon.com/128/566/566445.png"
            alt=""
            width="20"
            height="50"
          />
        </div>
        <div>
          <img
            src="https://res.cloudinary.com/dou3yyisb/image/upload/v1694444797/PlayGame/logo-removebg_haqooq.png"
            alt=""
            width="300"
          />
        </div>
      </div>
      <div className={style.formContainer}>
        <div className={style.containerLogo}></div>
        <form>
          <h2>Win</h2>
          <label>Puesto 1</label>
          <select>
            <option value="Corredor 1">Corredor 1</option>
            <option value="Corredor 2">Corredor 2</option>
            <option value="Corredor 3">Corredor 3</option>
            <option value="Corredor 4">Corredor 4</option>
          </select>
          <input type="number" placeholder="Ingrese monto a apostar" />
          <button>Enviar apuesta</button>
        </form>
        <form>
          <h2>Exacta</h2>
          <label>Puesto 1</label>
          <select>
            <option value="Corredor 1">Corredor 1</option>
            <option value="Corredor 2">Corredor 2</option>
            <option value="Corredor 3">Corredor 3</option>
            <option value="Corredor 4">Corredor 4</option>
          </select>
          <label>Puesto 2</label>
          <select>
            <option value="Corredor 1">Corredor 1</option>
            <option value="Corredor 2">Corredor 2</option>
            <option value="Corredor 3">Corredor 3</option>
            <option value="Corredor 4">Corredor 4</option>
          </select>
          <input type="number" placeholder="Ingrese monto a apostar" />
          <button>Enviar apuesta</button>
        </form>
        <form>
          <h2>Trifecta</h2>
          <label>Puesto 1</label>
          <select>
            <option value="Corredor 1">Corredor 1</option>
            <option value="Corredor 2">Corredor 2</option>
            <option value="Corredor 3">Corredor 3</option>
            <option value="Corredor 4">Corredor 4</option>
          </select>
          <label>Puesto 2</label>
          <select>
            <option value="Corredor 1">Corredor 1</option>
            <option value="Corredor 2">Corredor 2</option>
            <option value="Corredor 3">Corredor 3</option>
            <option value="Corredor 4">Corredor 4</option>
          </select>
          <label>Puesto 3</label>
          <select>
            <option value="Corredor 1">Corredor 1</option>
            <option value="Corredor 2">Corredor 2</option>
            <option value="Corredor 3">Corredor 3</option>
            <option value="Corredor 4">Corredor 4</option>
          </select>
          <input type="number" placeholder="Ingrese monto a apostar" />
          <button>Enviar apuesta</button>
        </form>
        <form>
          <h2>Superfecta</h2>
          <label>Puesto 1</label>
          <select>
            <option value="Corredor 1">Corredor 1</option>
            <option value="Corredor 2">Corredor 2</option>
            <option value="Corredor 3">Corredor 3</option>
            <option value="Corredor 4">Corredor 4</option>
          </select>
          <label>Puesto 2</label>
          <select>
            <option value="Corredor 1">Corredor 1</option>
            <option value="Corredor 2">Corredor 2</option>
            <option value="Corredor 3">Corredor 3</option>
            <option value="Corredor 4">Corredor 4</option>
          </select>
          <label>Puesto 3</label>
          <select>
            <option value="Corredor 1">Corredor 1</option>
            <option value="Corredor 2">Corredor 2</option>
            <option value="Corredor 3">Corredor 3</option>
            <option value="Corredor 4">Corredor 4</option>
          </select>
          <label>Puesto 4</label>
          <select>
            <option value="Corredor 1">Corredor 1</option>
            <option value="Corredor 2">Corredor 2</option>
            <option value="Corredor 3">Corredor 3</option>
            <option value="Corredor 4">Corredor 4</option>
          </select>
          <input type="number" placeholder="Ingrese monto a apostar" />
          <button>Enviar apuesta</button>
        </form>
      </div>
    </div>
  );
};

export default Home;
