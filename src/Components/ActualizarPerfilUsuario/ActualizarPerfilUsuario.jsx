import React, { useEffect, useState } from 'react';
import styles from "./ActualizarPerfilUsuario.module.css";
import { getUserByUsername, actualizarPerfilUsuario, actualizarPasswordUsuario } from "../../Redux/Actions";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

function ActualizarPerfilUsuario() {
  const dispatch = useDispatch()
  const { username } = useParams();
  const usuario = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(getUserByUsername(username))
  }, [dispatch, username])

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    imagen: "",
  });

  const [password, setPassword] = useState({
    username:"",
    contraseñaActual: "",
    nuevaContraseña: "",


  })
  useEffect(() => {
    // Actualiza formData cuando el usuario cambie
    setFormData({
      username: usuario.username,
      email: usuario.email,
      imagen: usuario.imagen,
    });
    setPassword({
      username: usuario.username,
      contraseñaActual: "",
    nuevaContraseña: "",
    });
  }, [usuario])

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    imagen: "",
  });

  // Agregar estado para verificar si algún campo está vacío
  const [isAnyFieldEmpty, setIsAnyFieldEmpty] = useState(false);


  const handleChangePerfil = (event) => {
    setFormData({
      ...formData,
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
    })
   
  }

  const handleActualizarPerfil = (event) => {
    event.preventDefault();

    // Validar campos requeridos antes de enviar
    if (isAnyFieldEmpty) {
      // Mostrar un mensaje de error general o tomar la acción necesaria
      return;
    }

    dispatch(actualizarPerfilUsuario(formData));
  };

  const handleActualizarPassword =(event)=>{
    event.preventDefault()
    dispatch(actualizarPasswordUsuario(password))
    console.log("999999999999999999999999999", password)
    
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Actualizar Perfil</h1>
      <div className={styles.form}>
        <label className={styles.label}>Usuario</label>
        <input
          type="text"
          name='username'
          value={formData.username}
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
          name='email'
          value={formData.email}
          onChange={handleChangePerfil}
          placeholder="Email"
          className={styles.input}
          required
        />
        <span className={styles.error}>{errors.email}</span>
        <label className={styles.label}>Imagen</label>
        <input
          type="text"
          name='imagen'
          value={formData.imagen}
          onChange={handleChangePerfil}
          placeholder="URL de la imagen"
          className={styles.input}
          required
        />
        <span className={styles.error}>{errors.imagen}</span>


        
        <button disabled={isAnyFieldEmpty} onClick={handleActualizarPerfil} className={styles.button}>
          Actualizar Perfil
        </button>
      </div>

      <h1 className={styles.title}>Actualizar Contraseña</h1>
      <div className={styles.form}>
        {/* <label className={styles.label}>Usuario</label> */}
        <input
          type="text"
          name='username'
          value={password.username}
          placeholder="Nombre de usuario"
          disabled={true}
          className={styles.input}
          style={{ display: 'none' }}
          onChange={handleChangePassword}
          
        />
        
        <label className={styles.label}>Contraseña Actual</label>
        <input
          type="password"
          name='contraseñaActual'
          value={password.email}
          onChange={handleChangePassword}
          placeholder="Digite contraseña actual"
          className={styles.input}
          
        />
        
        <label className={styles.label}>Nueva Contraseña</label>
        <input
          type="password"
          name='nuevaContraseña'
          value={password.imagen}
          onChange={handleChangePassword}
          placeholder="digite su nueva contraseña"
          className={styles.input}
          
        />
        
        <button  onClick={handleActualizarPassword} className={styles.button}>
          Actualizar Contraseña
        </button>
      </div>



    </div>
  );
}

export default ActualizarPerfilUsuario;



