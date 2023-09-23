import style from "./CrearCorredor.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  postCorredor,
  getCarrera,
  getcarreraActiva,
} from "../../Redux/Actions";
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

const CrearCorredor = () => {
  const dispatch = useDispatch();
  const carrera = useSelector((state) => state.carrera);
  const unicacarrera = useSelector((state) => state.unicacarrera);
  const [corredor, setCorredor] = useState({
    id: unicacarrera.id,
    CrearcarreraId: unicacarrera.id,
    nombre: "",
    numero: "",
    descripcion: "",
    imagen1: "https://cdn-icons-png.flaticon.com/128/213/213923.png",
  });
  console.log("carrerrrrrrrrrrrrr", unicacarrera);
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!corredor.nombre || !corredor.numero || !corredor.descripcion) {
      Swal.fire({
        icon: "error",
        title: "Completa todos los campos correctamente",
        text: "Completa los campos",
      });
      return;
    }
    dispatch(postCorredor(corredor));
    Swal.fire({
      icon: "success",
      title: "Corredor Añadido",
      text: "Corredor cargado correctamente",
    });
    setCorredor({
      nombre: "",
      numero: "",
      descripcion: "",
      imagen1: "https://cdn-icons-png.flaticon.com/128/213/213923.png",
    });
  };

  const handleChange = (event) => {
    dispatch(getcarreraActiva(event.target.value));
    setCorredor({
      ...corredor,
      id: unicacarrera.id,
      CrearcarreraId: unicacarrera.id,
      [event.target.name]: event.target.value,
    });
  };
  useEffect(() => {
    dispatch(getCarrera());
  }, []);
  console.log(corredor);
  return (
    <div className={style.container}>
      <h1 className={style.title}>Agregar Corredor</h1>
      <div className={style.containerForm}>
        <form className={style.formulario} onSubmit={handleSubmit}>
          <label>Seleccione la carrera</label>
          <select name="carrera" onChange={handleChange}>
            <option value="">Seleccione la carrera</option>
            {carrera.map((element) => (
              <option key={element.id}>
                {" "}
                {element.nombrecarrera} {element.numero}{" "}
              </option>
            ))}
          </select>
          <label>Ingresar nombre corredor</label>
          <input
            type="text"
            placeholder="Nombre Corredor"
            name="nombre"
            value={corredor.nombre}
            onChange={handleChange}
          />
          <label>Ingresar numero del corredor</label>
          <input
            type="number"
            placeholder="Número del corredor"
            name="numero"
            value={corredor.numero}
            onChange={handleChange}
          />
          <label>Ingresar descripción del corredor</label>
          <textarea
            name="descripcion"
            id=""
            cols="30"
            rows="10"
            onChange={handleChange}
            value={corredor.descripcion}
          />
          <button>Agregar</button>
        </form>
        <div className={style.previewCorredor}>
          <h2>{corredor.nombre}</h2>
          <p>{corredor.numero}</p>
          <p>{corredor.descripcion}</p>
          <div>
            <img src={corredor.imagen1} alt="" width="80rem" />
            <img src={corredor.imagen2} alt="" width="80rem" />
            <img src={corredor.imagen3} alt="" width="80rem" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrearCorredor;
