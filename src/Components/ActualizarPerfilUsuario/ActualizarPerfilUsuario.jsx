import React, { useEffect, useState } from "react";
import styles from "./ActualizarPerfilUsuario.module.css";
import {
  getUserByUsername,
  actualizarPerfilUsuario,
  actualizarPasswordUsuario,
} from "../../Redux/Actions";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

function ActualizarPerfilUsuario() {
  const dispatch = useDispatch();
  const { username } = useParams();
  const usuario = useSelector((state) => state.user);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    dispatch(getUserByUsername(username));
  }, [dispatch, username]);

  const [user, setUser] = useState({
    username: "",
    email: "",
    imagen: "",
  });

  const [password, setPassword] = useState({
    username: "",
    contraseñaActual: "",
    nuevaContraseña: "",
  });
  useEffect(() => {
    // Actualiza formData cuando el usuario cambie
    setUser({
      username: usuario.username,
      email: usuario.email,
    });
    setPassword({
      username: usuario.username,
      contraseñaActual: "",
      nuevaContraseña: "",
    });
  }, [usuario]);

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    imagen: "",
  });

  // Agregar estado para verificar si algún campo está vacío
  const [isAnyFieldEmpty, setIsAnyFieldEmpty] = useState(false);

  const handleChangePerfil = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });

    // Validar campos requeridos y mostrar mensajes de error
    if (event.target.name === "username" && !event.target.value) {
      setErrors({ ...errors, username: "Este campo es requerido" });
      setIsAnyFieldEmpty(true);
    } else if (event.target.name === "email" && !event.target.value) {
      setErrors({ ...errors, email: "Este campo es requerido" });
      setIsAnyFieldEmpty(true);
    } else if (event.target.name === "imagen" && !event.target.value) {
      setErrors({ ...errors, imagen: "Este campo es requerido" });
      setIsAnyFieldEmpty(true);
    } else {
      // Limpiar mensajes de error si el campo se completa
      setErrors({ ...errors, [event.target.name]: "" });
      setIsAnyFieldEmpty(false);
    }
  };

  const handleChangePassword = (event) => {
    setPassword({
      ...password,
      [event.target.name]: event.target.value,
    });
  };

  const handleActualizarPerfil = (event) => {
    event.preventDefault();

    // Validar campos requeridos antes de enviar
    if (isAnyFieldEmpty) {
      // Mostrar un mensaje de error general o tomar la acción necesaria
      return;
    }

    dispatch(actualizarPerfilUsuario(user));
    console.log("userrrrrrrrrrrrrrrrrrrrrrrrrrrr", user);
  };

  const handleActualizarPassword = (event) => {
    event.preventDefault();
    dispatch(actualizarPasswordUsuario(password));
  };
  console.log("999999999999999999999999999", user);
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
          setUser({
            ...user,
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

  const previewImage = () => {
    if (selectedImage) {
      return (
        <img src={URL.createObjectURL(selectedImage)} className={styles.img} />
      );
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Actualizar Perfil</h1>
      <div className={styles.form}>
        <label className={styles.label}>Usuario</label>
        <input
          type="text"
          name="username"
          value={user.username}
          onChange={handleChangePerfil}
          placeholder="Nombre de usuario"
          disabled={true}
          className={styles.input}
          required
        />
        <span className={styles.error}>{errors.username}</span>

        <label className={styles.label}>Correo</label>
        <input
          type="text"
          name="email"
          value={user.email}
          onChange={handleChangePerfil}
          placeholder="Email"
          className={styles.input}
          required
        />
        <span className={styles.error}>{errors.email}</span>
        <label className={styles.label}>Imagen</label>
        <input
          type="file"
          name="imagen"
          onChange={handleChangeImage}
          placeholder="URL de la imagen"
          className={styles.input}
          required
        />
        {previewImage()}
        <span className={styles.error}>{errors.imagen}</span>

        <button
          disabled={isAnyFieldEmpty}
          onClick={handleActualizarPerfil}
          className={styles.button}
        >
          Actualizar Perfil
        </button>
      </div>

      <h1 className={styles.title}>Actualizar Contraseña</h1>
      <div className={styles.form}>
        {/* <label className={styles.label}>Usuario</label> */}
        <input
          type="text"
          name="username"
          value={password.username}
          placeholder="Nombre de usuario"
          disabled={true}
          className={styles.input}
          style={{ display: "none" }}
          onChange={handleChangePassword}
        />

        <label className={styles.label}>Contraseña Actual</label>
        <input
          type="password"
          name="contraseñaActual"
          value={password.email}
          onChange={handleChangePassword}
          placeholder="Digite contraseña actual"
          className={styles.input}
        />

        <label className={styles.label}>Nueva Contraseña</label>
        <input
          type="password"
          name="nuevaContraseña"
          value={password.imagen}
          onChange={handleChangePassword}
          placeholder="digite su nueva contraseña"
          className={styles.input}
        />

        <button onClick={handleActualizarPassword} className={styles.button}>
          Actualizar Contraseña
        </button>
      </div>
    </div>
  );
}

export default ActualizarPerfilUsuario;
