import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import style from "./Login.module.css";
const Login = () => {
  return (
    <div className={style.registerContainer}>
      <div className={style.formContainer}>
        <div className={style.pruebaCont}>
          <div className={style.prueba2}>
            <div className={style.registrate}>
              <h1 className={style.title}>Inicia sesion en PLAYCLUB</h1>
              <p>
                No tienes cuenta? <a href="/register">Registrar</a>
              </p>
            </div>
            <form className={style.form}>
              <div className={style.campoForm}>
                <img
                  src="https://res.cloudinary.com/dou3yyisb/image/upload/v1694446492/PlayGame/arroba_rzzcre.png"
                  alt=""
                  width="25"
                />
                <input type="email" placeholder=" Email" />
              </div>
              <br />
              <div className={style.campoForm}>
                <img
                  src="https://res.cloudinary.com/dou3yyisb/image/upload/v1694446492/PlayGame/secured-lock_slyfz7.png"
                  alt=""
                  width="25"
                />
                <input type="password" placeholder=" Password" />
              </div>
              <br />

              <button className={style.button}>Iniciar sesión</button>
            </form>
          </div>
          <div className={style.logo}>
            <img
              src="https://res.cloudinary.com/dou3yyisb/image/upload/v1694444797/PlayGame/logo-removebg_haqooq.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
