import style from "./CargaPuntosUser.module.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React, { useRef, useState, useEffect } from "react";
import { getUserByIdParams, cargaPuntos } from "../../Redux/Actions";

const CargaPuntosUser = () => {
  const { id } = useParams();
  const userById = useSelector((state) => state.userId);
  console.log("userById", userById);

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

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(cargaPuntos(carga));
  };
  console.log("cargaaa", carga);

  return (
    <div className={style.container}>
      <h1 className={style.title}>Recarga de puntos</h1>
      <div className={style.formContainer}>
        <form className={style.formulario} onSubmit={handleSubmit}>
          <label>Usuario a cargar</label>
          <label>{userById.username}</label>
          <label>Ingrese monto a cargar</label>
          <input type="number" name="cantidad" onChange={handleChange} />
          <label>Precio monto</label>
          <input type="number" name="precio" onChange={handleChange} />
          <button>Cargar Puntos</button>
        </form>
      </div>
    </div>
  );
};

export default CargaPuntosUser;
