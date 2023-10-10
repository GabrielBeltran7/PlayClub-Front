import style from "./RetirarPuntos.module.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React, { useRef, useState, useEffect } from "react";
import {
  getUserByIdParams,
  cargaPuntos,
  retirarPuntos,
  cargarPuntosSubadmin,
} from "../../Redux/Actions";
import Swal from "sweetalert2";
import BotonAtras from "../BotonAtras/BotonAtras";

const RetirarPuntos = () => {
  const { id, idSubAdmin } = useParams();
  const userById = useSelector((state) => state.userId);

  const user = useSelector((state) => state.user);
  //   const username = useSelector((state) => state.user.username);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserByIdParams(id));
  }, []);
  const [puntos, setPuntos] = useState({
    username: userById.username,
    id: idSubAdmin,
    cantidad: 0,
  });

  useEffect(() => {
    setPuntos({
      ...puntos,
      username: userById.username,
      id: idSubAdmin,
    });
  }, [userById]);

  const handleChange = (event) => {
    setPuntos({
      ...puntos,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    Swal.fire({
      title: `¿Estas seguro de retirar ${puntos.cantidad} puntos?`,
      text: `Estas por retirar ${puntos.cantidad} puntos a ${userById.username}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Cargar Puntos",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await dispatch(retirarPuntos(puntos));
        console.log(response);
        if (response) {
          Swal.fire(
            "Retiro completado!",
            "Los puntos se retiraron Correctamente",
            "success"
          );
        }

        setPuntos({
          ...puntos,
          cantidad: "",
          precio: "",
        });
      }
    });
  };

  return (
    <div className={style.container}>
      <div className={style.contanierboton}>
        <BotonAtras />
      </div>

      <h1 className={style.title}>Retiro de puntos</h1>
      <div className={style.formContainer}>
        <div className={style.contImage}>
          <img
            src="https://res.cloudinary.com/dou3yyisb/image/upload/v1694394442/btc-icon-arreglo_xzuvh2.png"
            alt="bitcoin icon"
            width="300"
          />
        </div>
        <form className={style.formulario} onSubmit={handleSubmit}>
          <label>Vas a retirarle puntos a</label>
          <label>{userById.username}</label>
          <label>Ingrese monto a retirar</label>
          <input
            type="number"
            name="cantidad"
            onChange={handleChange}
            value={puntos.cantidad}
            min="0"
            pattern="^[0-9]+"
          />

          {puntos.cantidad <= 0 ? (
            <button disabled>Retirar Puntos</button>
          ) : (
            <button>Retirar Puntos</button>
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

export default RetirarPuntos;
