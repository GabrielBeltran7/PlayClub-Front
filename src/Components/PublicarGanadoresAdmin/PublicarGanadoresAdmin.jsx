import React, { useRef, useState, useEffect } from "react";
import {
  getCarrera,
  getCarrerayCorredores,
  postGanadores,
  getcarreraActiva,
} from "../../Redux/Actions";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import style from "./PublicarGanadoresAdmin.module.css";

const PublicarGanadoresAdmin = ({ user }) => {
  const carrera = useSelector((state) => state.carrera);
  const carreraycorredores = useSelector((state) => state.carreraycorredores);
  const unicacarrera = useSelector((state) => state.unicacarrera);
  const dispatch = useDispatch();

  const [ganadores, setGanadores] = useState({
    id:"",
    nombreCarrera: "",
    username: user.username,
    primerPuesto: "",
    segundoPuesto: "",
    tercerPuesto: "",
    cuartoPuesto: "",
  });

  useEffect(() => {
    dispatch(getCarrera());
  }, []);

  const handleChange = (event) => {

    const selectedCarrera = event.target.value;
    dispatch(getcarreraActiva(selectedCarrera));
    if (selectedCarrera !== "") {
      dispatch(getCarrerayCorredores(event.target.value));
    }
    setGanadores({
      ...ganadores,
        id:unicacarrera.id,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      !ganadores.primerPuesto ||
      !ganadores.segundoPuesto ||
      !ganadores.tercerPuesto ||
      !ganadores.cuartoPuesto
    ) {
      Swal.fire({
        icon: "error",
        title: "Completa todos los campos correctamente",
        text: "Completa los campos",
      });
    } else {
      dispatch(postGanadores(ganadores));
      Swal.fire({
        icon: "success",
        title: "GANADORES PUBLICADOS",
        text: "Ganadores publicados correctamente",
      });
    }
  };

  console.log(ganadores);

  return (
    <div className={style.container}>
      <h1 className={style.title}>Cargar Ganadores</h1>
      <div className={style.contenedorTodo}>
        <form className={style.form} onSubmit={handleSubmit}>
          <select name="nombreCarrera" onChange={handleChange}>
            <option value="">Seleccione la carrera</option>
            {carrera.map((element) => (
              <option key={element.id}>
                {" "}
                {element.nombrecarrera} {element.numero}{" "}
              </option>
            ))}
          </select>
          <label>Primer puesto</label>
          <select name="primerPuesto" onChange={handleChange} required>
            <option value="">--Elije un corredor--</option>
            {Object.keys(carreraycorredores).length
              ? carreraycorredores.Crearcorredors.map((element) => (
                  <option key={element.id}>
                    {" "}
                    {element.nombre} {element.numero}{" "}
                  </option>
                ))
              : ""}
            ,
          </select>
          <label>Segundo puesto</label>
          <select name="segundoPuesto" onChange={handleChange} required>
            <option value="">--Elije un corredor--</option>
            {Object.keys(carreraycorredores).length
              ? carreraycorredores.Crearcorredors.map((element) => (
                  <option key={element.id}>
                    {" "}
                    {element.nombre} {element.numero}{" "}
                  </option>
                ))
              : ""}
            ,
          </select>
          <label>Tercer Puesto</label>
          <select name="tercerPuesto" onChange={handleChange} required>
            <option value="">--Elije un corredor--</option>
            {Object.keys(carreraycorredores).length
              ? carreraycorredores.Crearcorredors.map((element) => (
                  <option key={element.id}>
                    {" "}
                    {element.nombre} {element.numero}{" "}
                  </option>
                ))
              : ""}
            ,
          </select>
          <label>Cuarto puesto</label>
          <select name="cuartoPuesto" onChange={handleChange} required>
            <option value="">--Elije un corredor--</option>
            {Object.keys(carreraycorredores).length
              ? carreraycorredores.Crearcorredors.map((element) => (
                  <option key={element.id}>
                    {" "}
                    {element.nombre} {element.numero}{" "}
                  </option>
                ))
              : ""}
            ,
          </select>
          <button>Crear carrera</button>
        </form>
      </div>
    </div>
  );
};

export default PublicarGanadoresAdmin;
