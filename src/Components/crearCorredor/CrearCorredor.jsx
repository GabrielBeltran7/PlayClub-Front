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
  const [selectedImage, setSelectedImage] = useState(null);
  const [corredor, setCorredor] = useState({
    id: unicacarrera.id,
    CrearcarreraId: unicacarrera.id,
    nombre: "",
    numero: "",
    descripcion: "",
    imagen1: "",
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
      imagen1: "",
    });
  };
  const handleChangeImage = async (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setSelectedImage(selectedFile);
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("upload_preset", "Playclub");
      try {
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dou3yyisb/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );
        if (response.ok) {
          const data = await response.json();
          setImageUrl(data.secure_url);
          setCorredor({
            ...corredor,
            imagen1: data.secure_url,
          });
        } else {
          console.error("Error al cargar la imagen");
        }
      } catch (error) {
        console.error("Error al cargar la imagen", error);
      }
    }
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

  const previewImage = () => {
    if (selectedImage) {
      return (
        <img src={URL.createObjectURL(selectedImage)} className={style.img} />
      );
    }
  };

  return (
    <div className={style.container}>
      <h1 className={style.title}>Añadir Corredores</h1>
      <div className={style.containerLogo}>
        <img
          src="https://res.cloudinary.com/dou3yyisb/image/upload/v1694444797/PlayGame/logo-removebg_haqooq.png"
          alt=""
          width="300"
        />
      </div>
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

          <input
            className={style.profileImage}
            type="file"
            name="imagen"
            onChange={handleChangeImage}
            accept="image/*"
          />

          <button>Agregar</button>
        </form>

        <div className={style.previewCorredor}>
          <h2>{corredor.nombre}</h2>
          <p>{corredor.numero}</p>
          <p>{corredor.descripcion}</p>
          {previewImage()}
        </div>
      </div>
    </div>
  );
};

export default CrearCorredor;
