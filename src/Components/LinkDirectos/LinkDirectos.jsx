import style from "./LinkDirectos.module.css";

import { useDispatch } from "react-redux";
import React, {  useState,  } from "react";
import {  crearLinkDirectos } from "../../Redux/Actions";
import Swal from "sweetalert2";

const LinkDirectos = ({user}) => {  /// me traje por props el usuario desde el componente HomeAdmin

  const dispatch = useDispatch();

  const [linkdirectos, setlinkdirectos] = useState({
    username: user.username,
    camara1:"",
    camara2:"",
    camara3:"",
    camara4:"",
    camara5:""
  });

  const handleChange = (event) => {
    setlinkdirectos({
      ...linkdirectos,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    Swal.fire({
      title: `¿Estas seguro de cargar estos Link?`,
      text: `Estas por cargar 5 link para las transmisiones en vivo`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Cargar Puntos",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(crearLinkDirectos(linkdirectos));
        
        setlinkdirectos({
          ...linkdirectos,
          camara1: "",
          camara2:"",
          camara3:"",
          camara4:"",
          camara5:""
          
        });
        Swal.fire(
          "Transaccion completa!",
          "Los Link  se enviaron de forma correcta",
          "success"
        );
      }
    });
  };
  return (
    <div className={style.container}>
      <div></div>
      <h1 className={style.title}>Crear Link de transmisión en vivo</h1>
      <div className={style.formContainer}>
        <div className={style.contImage}>
          <img
            src="https://res.cloudinary.com/dou3yyisb/image/upload/v1694394442/btc-icon-arreglo_xzuvh2.png"
            alt="bitcoin icon"
            width="300"
          />
        </div>
        <form className={style.formulario} onSubmit={handleSubmit}>
          <label></label>
          
          <label>Usuario: {user.username} </label>
          <label >Camara 1</label>
          <input
            type="url"
            name="camara1"
             onChange={handleChange}
            required
          />
           <label >Camara 2</label>
          <input
            type="url"
            name="camara2"
             onChange={handleChange}
            required
          />
           <label >Camara 3</label>
          <input
            type="url"
            name="camara3"
             onChange={handleChange}
            required
          />
           <label >Camara 4</label>
          <input
            type="url"
            name="camara4"
             onChange={handleChange}
            required
          />
           <label >Camara 5</label>
          <input
            type="url"
            name="camara5"
             onChange={handleChange}
            required
          />
         
          {linkdirectos.camara1==="" ||linkdirectos.camara2==="" || linkdirectos.camara3==="" ||linkdirectos.camara4==="" || linkdirectos.camara5 ==="" ? (
            <button disabled>Enviar</button>
          ) : (
            <button>Enviar</button>
          )}
        </form>
        <div className={style.contImage}>
          <img
            src="https://res.cloudinary.com/dou3yyisb/image/upload/v1694395421/usdt-icon-arregladooooo_tqgoct.png"
            alt="usdt icon"
            width="200"
          />
        </div>
      </div>
    </div>
  );
};

export default LinkDirectos;
