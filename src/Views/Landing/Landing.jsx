import style from "./Landing.module.css";

export default function Landing() {
  return (
    <div className={style.container}>
      <div className={style.contentInfo}>
        <div className={style.containerBienvenido}>
          <div className={style.contImage}>
            <img
              src="https://res.cloudinary.com/dou3yyisb/image/upload/v1694394442/btc-icon-arreglo_xzuvh2.png"
              alt="bitcoin icon"
              width="400"
            />
          </div>

          <img
            src="https://res.cloudinary.com/dou3yyisb/image/upload/v1694444797/PlayGame/logo-removebg_haqooq.png"
            alt="Logo playclub"
            width="650"
            className={style.logo}
          />
          <div className={style.contImage}>
            <img
              src="https://res.cloudinary.com/dou3yyisb/image/upload/v1694395421/usdt-icon-arregladooooo_tqgoct.png"
              alt="usdt icon"
              width="270"
            />
          </div>
        </div>
      </div>
      <a className={style.btn} href="/login">
        Iniciar sesion
      </a>
      <a className={style.btn} href="/register">
        Registrarse
      </a>
      <a className={style.btn} href="/home">
        Home
      </a>
    </div>
  );
}
