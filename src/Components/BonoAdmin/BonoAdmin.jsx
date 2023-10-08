import style from "./BonoAdmin.module.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React, { useRef, useState, useEffect } from "react";
import { cargaBonosaUsuarios, getUserByUsername } from "../../Redux/Actions";
import Swal from "sweetalert2";

const BonoAdmin = ({ user }) => {
  const dispatch = useDispatch();

  const [bonos, setBonos] = useState({
    username: user.username,
    cantidad: "",
  });

  const handleChange = (event) => {
    setBonos({
      ...bonos,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      Swal.fire({
        title: `¿Estas seguro de cargar ${bonos.cantidad} puntos a cada USUARIO?`,
        text: `Estas por cargar ${bonos.cantidad} puntos a cada uno de  tus usuarios`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Cargar Puntos",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const response = await dispatch(cargaBonosaUsuarios(bonos));
          setBonos({
            ...bonos,
            cantidad: "",
          });
          console.log("8888888888888888888888",response);
          if (response) {
            Swal.fire({
              icon: "success",
              title: response.data.message,
              timerProgressBar: true,
              timer: 3000,
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "No eres un Administador Autorizado",
              timerProgressBar: true,
              timer: 2500,
            });
          }
        }
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "No eres un Administador Autorizado",
        timerProgressBar: true,
        timer: 1500,
      });
    }
  };
  return (
    <div className={style.container}>
      <h1 className={style.title}>Bonos para todos</h1>
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

          <label>Ingrese cantidad para cada Usuario</label>
          <input
            type="number"
            name="cantidad"
            onChange={handleChange}
            value={bonos.cantidad}
            min="0"
            pattern="^[0-9]+"
          />

          {bonos.cantidad <= 0 ? (
            <button disabled>Cargar Puntos</button>
          ) : (
            <button>Cargar Puntos</button>
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

export default BonoAdmin;
