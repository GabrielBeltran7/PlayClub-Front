import style from "./Login.module.css";
import React, { useState } from "react";
import { loginUser, loginSuccess } from "../../Redux/Actions";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [usuario, setUsuario] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const [userLogged, setUserLogged] = useState({});

  const dispatch = useDispatch();

  const handleChangeEmailUser = (event) => {
    const value = event.target.value;
    // Verifica si el valor ingresado es un correo electrónico
    if (/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(value)) {
      // Es un correo electrónico
      setUsuario({
        ...usuario,
        email: value,
        username: "",
      });
    } else {
      // No es un correo electrónico, asumimos que es un nombre de usuario
      setUsuario({
        ...usuario,
        username: value,
        email: "",
      });
    }
  };

  const handleChangePass = (event) => {
    const value = event.target.value;
    setUsuario({
      ...usuario,
      password: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await dispatch(loginUser(usuario));
      if (response) {
        const userData = response.data;
        console.log(userData);
        dispatch(loginSuccess(userData));
        setUserLogged(userData);
        Swal.fire({
          icon: "success",
          title: "Bienvenido a WIN123...",
          text: "Logueado correctamente",
          timerProgressBar: true,
          timer: 1000,
        });
        navigate("/home");
      }
    } catch (error) {
      const errorAviso = error.response.data;
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: errorAviso,
        timerProgressBar: true,
        timer: 1500,
      });
    }
  };
  const redirigirACustomModal = () => {
    navigate('/CustomModal'); 
  };
  return (
    <div className={style.container}>
      <div className={style.registrate}>
        <h1>
          Inicia sesion en{" "}
          <span className={style.span}>
            <span className={style.win}>WIN</span>
            <span className={style.numeros}>123</span>
          </span>
        </h1>
        <p>
          ¿No tienes cuenta? <a href="/register">Registrar</a>
        </p>
      </div>
      <div className={style.containerForm}>
        <form className={style.form} onSubmit={handleSubmit}>
          <div className={style.inputs}>
            <img
              src="https://res.cloudinary.com/dou3yyisb/image/upload/v1694446492/PlayGame/account_hjcmcp.png"
              alt=""
              width="25"
            />
            <input
              type="text"
              placeholder="Ingrese email o usuario"
              onChange={handleChangeEmailUser}
            />
          </div>
          <div className={style.inputs}>
            <img
              src="https://res.cloudinary.com/dou3yyisb/image/upload/v1694446492/PlayGame/secured-lock_slyfz7.png"
              alt=""
              width="25"
            />
            <input
              type="password"
              placeholder="Password"
              onChange={handleChangePass}
              name="password"
            />
          </div>
          <button className={style.button}>Iniciar sesión</button>
         
        </form>
        <button onClick={redirigirACustomModal} className={style.button}> Olvidate tu contraseña</button>
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

export default Login;

{
  /* <div className={style.registerContainer}>
      <div className={style.formContainer}>
        <div className={style.pruebaCont}>
          <div className={style.prueba2}>
            <div className={style.formWrapper}>
              <div className={style.registrate}>
                <h1 className={style.title}>Inicia sesión en WIN123</h1>
                <p>
                  ¿No tienes cuenta? <a href="/register">Registrar</a>
                </p>
              </div>
              <form className={style.form} onSubmit={handleSubmit}>
                <div className={style.campoForm}>
                  <img
                    src="https://res.cloudinary.com/dou3yyisb/image/upload/v1694446492/PlayGame/account_hjcmcp.png"
                    alt=""
                    width="25"
                  />
                  <input
                    type="text"
                    placeholder="Ingrese email o usuario"
                    onChange={handleChangeEmailUser}
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
                    placeholder="Password"
                    onChange={handleChangePass}
                    name="password"
                  />
                </div>
                <br />
                <button className={style.button}>Iniciar sesión</button>
              </form>
            </div>
            <div className={style.logoWrapper}>
              <div className={style.logo}>
                <img
                  src="https://res.cloudinary.com/dou3yyisb/image/upload/v1694444797/PlayGame/logo-removebg_haqooq.png"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> */
}
