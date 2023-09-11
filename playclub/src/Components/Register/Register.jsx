import style from "./Register.module.css";

const Register = () => {
  return (
    <div className={style.registerContainer}>
      <div className={style.formContainer}>
        <div className={style.pruebaCont}>
          <div className={style.prueba2}>
            <div className={style.registrate}>
              <h1 className={style.title}>Registrate en PLAYCLUB</h1>
              <p>
                Ya tienes cuenta? <a href="/login">Ingresar</a>
              </p>
            </div>
            <form className={style.form}>
              <div className={style.campoForm}>
                <img
                  src="https://res.cloudinary.com/dou3yyisb/image/upload/v1694446492/PlayGame/account_hjcmcp.png"
                  alt=""
                  width="25"
                />
                <input type="text" placeholder=" Usuario" />
              </div>{" "}
              <br />
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
              <div className={style.termCondic}>
                <input type="checkbox" />
                <p>
                  Yo estoy de acuerdo con los{" "}
                  <a href="">terminos y condiciones</a>
                </p>
              </div>
              <button className={style.button}>Registrate</button>
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

export default Register;
