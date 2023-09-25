import style from "./CargarpuntosAdmin.module.css";

import { useDispatch } from "react-redux";
import React, { useState } from "react";
import { cargarpuntosaAdmin } from "../../Redux/Actions";
import Swal from "sweetalert2";

const CargarpuntosAdmin = ({ user }) => {
  const username = user.username;

  const dispatch = useDispatch();

  const [puntosAdmin, setpuntosAdmin] = useState({
    username: username,
    cantidad: "",
  });
  console.log("777777777777777777777", puntosAdmin.username);
  const handleChange = (event) => {
    setpuntosAdmin({
      ...puntosAdmin,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      Swal.fire({
        title: `¿Estas por cargar ${puntosAdmin.cantidad} puntos a ${puntosAdmin.username}?`,
        text: `Estas seguro de cargar ${puntosAdmin.cantidad} Puntos a ${puntosAdmin.username}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Cargar Puntos",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const response = await dispatch(cargarpuntosaAdmin(puntosAdmin));
          console.log("responseeeeeeeeee", response);
          setpuntosAdmin({
            ...puntosAdmin,
            cantidad: "",
          });
          if (response) {
            Swal.fire(
              "Transaccion completa!",
              "Los puntos se cargaron correctamente",
              "success"
            );
          } else {
            Swal.fire({
              icon: "error",
              title: "No eres un Administador Autorizado",
              timerProgressBar: true,
              timer: 1500,
            });
          }
        }
      });
    } catch (error) {
      console.error(pepe);
    }
  };
  return (
    <div className={style.container}>
      <div></div>
      <h1 className={style.title}>Cargar Puntos Admin</h1>
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

          <label>Ingrese cantidad para cargar</label>
          <input
            type="number"
            name="cantidad"
            onChange={handleChange}
            value={puntosAdmin.cantidad}
            min="0"
            pattern="^[0-9]+"
          />

          {puntosAdmin.cantidad <= 0 ? (
            <button disabled>Digite cantidad</button>
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

export default CargarpuntosAdmin;
