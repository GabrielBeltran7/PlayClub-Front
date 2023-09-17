import style from "./CrearCarrera.module.css";
import React, { useRef, useState, useEffect } from "react";
import { crearCarrera } from "../../Redux/Actions";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

const CrearCarrera = () => {
  const [carrera, setCarrera] = useState({
    username: "Gabriel",
    nombrecarrera: "",
    porcentajeWin: "",
    porcentajeExacta: "",
    porcentajeTrifecta: "",
    porcentajeSuperfecta: "",
  });

  const dispatch = useDispatch();
  const imagenes = {
    win: "https://res.cloudinary.com/dou3yyisb/image/upload/v1694750064/PlayGame/win_ffepdt.png",
    exacta:
      "https://res.cloudinary.com/dou3yyisb/image/upload/v1694750064/PlayGame/exacta_vwby15.png",
    trifecta:
      "https://res.cloudinary.com/dou3yyisb/image/upload/v1694750064/PlayGame/trifecta_uqnslm.png",
    superfecta:
      "https://res.cloudinary.com/dou3yyisb/image/upload/v1694750064/PlayGame/superfecta_uezsse.png",
  };

  const handleChange = (event) => {
    setCarrera({
      ...carrera,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      !carrera.nombrecarrera ||
      !carrera.porcentajeWin ||
      !carrera.porcentajeExacta ||
      !carrera.porcentajeTrifecta ||
      !carrera.porcentajeSuperfecta
    ) {
      Swal.fire({
        icon: "error",
        title: "Completa todos los campos correctamente",
        text: "Completa los campos",
      });
    } else {
      dispatch(crearCarrera(carrera));
      Swal.fire({
        icon: "success",
        title: "Corredor Añadido",
        text: "Corredor cargado correctamente",
      });
      setCarrera({
        username: "Gabriel",
        nombrecarrera: "",
        porcentajeWin: "",
        porcentajeExacta: "",
        porcentajeTrifecta: "",
        porcentajeSuperfecta: "",
      });
    }
  };

  return (
    <div className={style.container}>
      <h1 className={style.title}>Crear Carrera</h1>
      <div className={style.contenedorTodo}>
        <form className={style.form} onSubmit={handleSubmit}>
          <label> Nombre de la carrera</label>
          <input
            type="text"
            placeholder="Nombre carrera"
            name="nombrecarrera"
            onChange={handleChange}
            value={carrera.nombrecarrera}
          />
          <label> % Ganancia WIN</label>
          <input
            type="number"
            placeholder="% de ganancia WIN"
            name="porcentajeWin"
            onChange={handleChange}
            value={carrera.porcentajeWin}
          />
          <label> % Ganancia EXACTA</label>
          <input
            type="number"
            placeholder="% de ganancia EXACTA"
            name="porcentajeExacta"
            onChange={handleChange}
            value={carrera.porcentajeExacta}
          />
          <label> % Ganancia TRIFECTA</label>
          <input
            type="number"
            placeholder="% de ganancia TRIFECTA"
            name="porcentajeTrifecta"
            onChange={handleChange}
            value={carrera.porcentajeTrifecta}
          />
          <label> % Ganancia SUPERFECTA</label>
          <input
            type="number"
            placeholder="% de ganancia SUPERFECTA"
            name="porcentajeSuperfecta"
            onChange={handleChange}
            value={carrera.porcentajeSuperfecta}
          />
          <button>Crear carrera</button>
        </form>
        <div className={style.preview}>
          <h2>
            {carrera.nombrecarrera
              ? carrera.nombrecarrera
              : "INGRESE UN NOMBRE PARA LA CARRERA"}
          </h2>
          <div className={style.bloque}>
            <img src={imagenes.win} alt="" width="30" />
            <label>WIN: {carrera.porcentajeWin}%</label>
            <img src={imagenes.exacta} alt="" width="30" />
            <label>EXACTA: {carrera.porcentajeExacta}%</label>
          </div>
          <div className={style.bloque}>
            <img src={imagenes.trifecta} alt="" width="30" />
            <label>TRIFECTA: {carrera.porcentajeTrifecta}%</label>

            <img src={imagenes.superfecta} alt="" width="30" />
            <label>SUPERFECTA: {carrera.porcentajeSuperfecta}%</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrearCarrera;
