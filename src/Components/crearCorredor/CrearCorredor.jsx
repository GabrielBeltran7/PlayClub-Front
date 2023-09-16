import style from "./CrearCorredor.module.css";
import { useDispatch } from "react-redux";
import { postCorredor } from "../../Redux/Actions";
import React, { useState } from "react";
import Swal from "sweetalert2";

const CrearCorredor = () => {
  const dispatch = useDispatch();
  const [corredor, setCorredor] = useState({
    nombre: "",
    numero: "",
    descripcion: "",
    imagen1: "https://cdn-icons-png.flaticon.com/128/213/213923.png",
    imagen2: "https://cdn-icons-png.flaticon.com/128/213/213923.png",
    imagen3: "https://cdn-icons-png.flaticon.com/128/213/213923.png",
  });
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
    setCorredor({
      nombre: "",
      numero: "",
      descripcion: "",
      imagen1: "https://cdn-icons-png.flaticon.com/128/213/213923.png",
      imagen2: "https://cdn-icons-png.flaticon.com/128/213/213923.png",
      imagen3: "https://cdn-icons-png.flaticon.com/128/213/213923.png",
    });
  };

  console.log("corredor", corredor);

  const handleChange = (event) => {
    setCorredor({
      ...corredor,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className={style.container}>
      <h1 className={style.title}>Agregar Corredor</h1>
      <div className={style.containerForm}>
        <form className={style.formulario} onSubmit={handleSubmit}>
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
          <label>{corredor.numero}</label>
          <label>{corredor.descripcion}</label>
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
