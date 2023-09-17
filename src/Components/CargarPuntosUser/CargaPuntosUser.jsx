import style from "./CargaPuntosUser.module.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React, { useRef, useState, useEffect } from "react";
import { getUserByIdParams, cargaPuntos } from "../../Redux/Actions";
import Swal from "sweetalert2";

const CargaPuntosUser = () => {
  const { id } = useParams();
  const userById = useSelector((state) => state.userId);
  //console.log("userById", userById);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserByIdParams(id));
  }, []);

  const [carga, setCarga] = useState({
    id: id,
    UserId: id,
    username: userById.username, // acá iría el usuario del que está logueado. //!Hay que cambiarlo
    cantidad: "",
    precio: "",
  });

  useEffect(() => {
    setCarga({
      ...carga,
      username: userById.username,
    });
  }, [userById]);

  const handleChange = (event) => {
    setCarga({
      ...carga,
      username: userById.username,
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
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(cargaPuntos(carga));
        setCarga({
          ...carga,
          cantidad: "",
          precio: "",
        });
        Swal.fire(
          "Transaccion completa!",
          "Los puntos se cargaron correctamente",
          "success"
        );
      }
    });
  };
  console.log("cargaaa", carga);

  return (
    <div className={style.container}>
      <div></div>
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
            value={carga.precio}
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
