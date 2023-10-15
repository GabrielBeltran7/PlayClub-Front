import {
  getGanadores,
  getCarrera,
  getcarreraActiva,
} from "../../Redux/Actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Card } from "antd";
import style from "./GanadoresCarrera.module.css";

const GanadoresCarrera = () => {
  const dispatch = useDispatch();
  const carreras = useSelector((state) => state.carrera);
  const ganadorescarrera = useSelector(
    (state) => state.ganadores.GanadoresCarreras
  );

  const [ganadores, setGanadores] = useState({
    nombrecarrera: "",
  });

  const handleChange = (event) => {
    setGanadores({
      ...ganadores,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    dispatch(getCarrera());
    dispatch(getGanadores(ganadores));
  }, [ganadores]);

  return (
    <div className={style.page}>
      <form className={style.form}>
        <label className={style.label}>GANADORES</label>
         <select
          className={style.select}
          name="nombrecarrera"
          onChange={handleChange}
          required
        >
          <option value="">Elije una Carrera</option>
          {carreras.map((element) => (
            <option key={element.id} value={element.nombrecarrera}>
              {element.nombrecarrera}
            </option>
          ))}
        </select>
      </form>

      <Card
        className={style.primeracarta}
        title="#1  LUGAR"
        bordered={false}
        style={{
          width: 300,
        }}
      >
        <p>
          {ganadorescarrera && ganadorescarrera.length
            ? ganadorescarrera[0].primerPuesto
            : "No hay resultados"}
        </p>
      </Card>

      <Card
        className={style.segundacarta}
        title="#2  LUGAR"
        bordered={false}
        style={{
          width: 300,
        }}
      >
        <p>
          {ganadorescarrera && ganadorescarrera.length
            ? ganadorescarrera[0].segundoPuesto
            : "No hay resultados"}
        </p>
      </Card>
      <Card
        className={style.terceracarta}
        title="#3 LUGAR"
        bordered={false}
        style={{
          width: 300,
        }}
      >
        <p>
          {ganadorescarrera && ganadorescarrera.length
            ? ganadorescarrera[0].tercerPuesto
            : "No hay resultados"}
        </p>
      </Card>
      <Card
        className={style.cuartacarta}
        title="#4 LUGAR"
        bordered={false}
        style={{
          width: 300,
        }}
      >
        <p>
          {ganadorescarrera && ganadorescarrera.length
            ? ganadorescarrera[0].cuartoPuesto
            : "No hay resultados"}
        </p>
      </Card>
    </div>
  );
};

export default GanadoresCarrera;
