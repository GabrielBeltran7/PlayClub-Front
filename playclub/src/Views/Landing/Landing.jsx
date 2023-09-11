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
              width="500"
            />
          </div>

          <img
            src="https://res.cloudinary.com/dou3yyisb/image/upload/v1694392276/PlayGame/Logo_f7tdmv.png"
            alt="Logo playclub"
          />
          <div className={style.contImage}>
            <img
              src="https://res.cloudinary.com/dou3yyisb/image/upload/v1694395421/usdt-icon-arregladooooo_tqgoct.png"
              alt="usdt icon"
              width="350"
            />
          </div>
        </div>
      </div>
      <a className={style.btn} href="/home">
        Iniciar
      </a>
    </div>
  );
}
