import style from "./CargaPuntosUser.module.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React, { useRef, useState, useEffect } from "react";
import {
  getUserByIdParams,
  cargaPuntos,
  cargarPuntosSubadmin,
} from "../../Redux/Actions";
import Swal from "sweetalert2";
import BotonAtras from "../BotonAtras/BotonAtras";

const CargaPuntosUser = () => {
  const { id } = useParams();
  const userById = useSelector((state) => state.userId);

  const user = useSelector((state) => state.user);
  const username = useSelector((state) => state.user.username);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserByIdParams(id));
  }, []);

  const [carga, setCarga] = useState({
    id: user.id,
    UserId: id,
    username: username,
    cantidad: 0,
    precio: 0,
  });

  useEffect(() => {
    setCarga({
      ...carga,
      username: username,
    });
  }, [userById]);

  const handleChange = (event) => {
    setCarga({
      ...carga,
      username: username,
      precio: event.target.value,

      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    Swal.fire({
      title: `¿Estas seguro de cargar ${carga.cantidad} puntos?`,
      text: `Estas por cargar ${carga.cantidad} puntos a ${userById.username}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Cargar Puntos",
    }).then(async (result) => {
      if (result.isConfirmed) {
        if (user.admin) {
          const response = await dispatch(cargaPuntos(carga));
          console.log("responses ad,ommmmmmmm", response);
          if (response) {
            Swal.fire(
              "Transaccion Completada!",
              "Los puntos se cargaron Correctamente",
              "success"
            );
          }
        } else {
          const response = await dispatch(cargarPuntosSubadmin(carga));
          console.log("responses subadminnn", response);
          if (response !== undefined) {
            Swal.fire(
              "Transaccion completa!",
              "Los puntos se cargaron Correctamente",
              "success"
            );
          }
        }

        setCarga({
          ...carga,
          cantidad: "",
          precio: "",
        });
      }
    });
  };

  console.log("***********", carga);

  return (
    <div className={style.container}>
      <div className={style.contanierboton}>
        <BotonAtras />
      </div>

      <h1 className={style.title}>Recarga de puntos</h1>
      <div className={style.formContainer}>
        <div className={style.contImage}>
          <img
            src="https://res.cloudinary.com/dou3yyisb/image/upload/v1694394442/btc-icon-arreglo_xzuvh2.png"
            alt="bitcoin icon"
            width="300"
          />
        </div>
        <form className={style.formulario} onSubmit={handleSubmit}>
          <label>Usuario a cargar</label>
          <label>{userById.username}</label>
          <label>Ingrese monto a cargar</label>
          <input
            type="number"
            name="cantidad"
            onChange={handleChange}
            value={carga.cantidad}
            min="0"
            pattern="^[0-9]+"
          />
          <label>Precio monto</label>
          <input
            type="number"
            name="precio"
            onChange={handleChange}
            value={carga.cantidad}
            min="0"
            pattern="^[0-9]+"
          />
          {carga.cantidad <= 0 || carga.precio <= 0 ? (
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

export default CargaPuntosUser;
