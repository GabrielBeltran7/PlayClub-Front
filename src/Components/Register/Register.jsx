import style from "./Register.module.css";
import React, { useState } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import { useDispatch } from "react-redux";
import { postUser } from "../../Redux/Actions";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const [selectedImage, setSelectedImage] = useState(null);
  const [usuario, setUsuario] = useState({
    username: "",
    email: "",
    password: "",
    imagen: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (event) => {
    setUsuario({
      ...usuario,
      [event.target.name]: event.target.value,
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
          setUsuario({
            ...usuario,
            imagen: data.secure_url,
          });
        } else {
          console.error("Error al cargar la imagen");
        }
      } catch (error) {
        console.error("Error al cargar la imagen", error);
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await dispatch(postUser(usuario));
      if (response) {
        Swal.fire({
          icon: "success",
          title: "Bienvenido a WIN123...",
          text: `Registro completado logueate`,
        });
        navigate("/login");
      }
    } catch (error) {
      if (error) {
        const errorAviso = error.response.data.error;
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: errorAviso,
          timerProgressBar: true,
          timer: 5000,
        });
      }
    }
  };
  const previewImage = () => {
    if (selectedImage) {
      return (
        <img src={URL.createObjectURL(selectedImage)} className={style.img} />
      );
    }
  };

  return (
    <div className={style.container}>
      <div className={style.registrate}>
        <h1 className={style.title}>
          Registrate en <span className={style.span}>WIN123</span>
        </h1>
        <p>
          Ya tienes cuenta? <a href="/login">Ingresar</a>
        </p>
      </div>
      <div className={style.containerForm}>
        <form className={style.form} onSubmit={handleSubmit}>
          <div className={style.campoForm}>
            <img
              src="https://res.cloudinary.com/dou3yyisb/image/upload/v1694446492/PlayGame/account_hjcmcp.png"
              alt=""
              width="25"
            />
            <input
              type="text"
              placeholder=" Usuario"
              name="username"
              onChange={handleChange}
            />
          </div>{" "}
          <br />
          <div className={style.campoForm}>
            <img
              src="https://res.cloudinary.com/dou3yyisb/image/upload/v1694446492/PlayGame/arroba_rzzcre.png"
              alt=""
              width="25"
            />
            <input
              type="mail"
              placeholder=" Email"
              name="email"
              onChange={handleChange}
            />
          </div>
          <br />
          <div className={style.campoForm}>
            <img
              src="https://res.cloudinary.com/dou3yyisb/image/upload/v1694446492/PlayGame/secured-lock_slyfz7.png"
              alt=""
              width="25"
            />
            <input
              type="password"
              placeholder=" Password"
              name="password"
              onChange={handleChange}
            />
          </div>
          <br />
          <div className={style.containerImage}>
            <label >Selecciona una Imagen</label><br />
            
            <input
              className={style.profileImage}
              type="file"
              name="imagen"
              onChange={handleChangeImage}
              accept="image/*"
            />
            {previewImage()}
          </div>
          <div className={style.termCondic}>
            <input type="checkbox" />
            <p>
              Yo estoy de acuerdo con los <a href="">terminos y condiciones</a>
            </p>
          </div>
          <button className={style.button}>Registrate</button>
        </form>
        <div className={style.logo}>
          <img
            src="https://res.cloudinary.com/dou3yyisb/image/upload/v1694444797/PlayGame/logo-removebg_haqooq.png"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
