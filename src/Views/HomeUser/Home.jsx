import { useEffect } from "react";
import style from "./Home.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getUserById } from "../../Redux/Actions";

const Home = () => {
  const usuario = useSelector((state) => state.user);
  const userId = useSelector((state) => state.userId);
  console.log("este es el usuario", usuario);
  //onsole.log("usuario useselector", usuario);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserById(usuario.id));
  }, []);

  return (
    <div className={style.container}>
      <div className={style.infoUsuario}>
        <img src={usuario.imagen} alt={usuario.imagen} />
        <label>{usuario.username}</label>
        <label>Creditos:{usuario.cantidadtotal}</label>
        <img
          src="https://cdn-icons-png.flaticon.com/128/566/566445.png"
          alt=""
        />
      </div>
      <div className={style.formContainer}>
        <div className={style.containerLogo}>
          <img
            src="https://res.cloudinary.com/dou3yyisb/image/upload/v1694444797/PlayGame/logo-removebg_haqooq.png"
            alt=""
            width="300"
          />
        </div>
        <form>
          <h2>Win</h2>
          <label>Nombre Usuario:</label>
          <label>Cantidad de puntos</label>
          <label>Puesto 1</label>
          <select>
            <option value="Corredor 1">Corredor 1</option>
            <option value="Corredor 2">Corredor 2</option>
            <option value="Corredor 3">Corredor 3</option>
            <option value="Corredor 4">Corredor 4</option>
          </select>
          <input type="number" placeholder="Ingrese monto a apostar" />
          <button>Enviar apuesta</button>
        </form>
        <form>
          <h2>Exacta</h2>
          <label>Nombre Usuario:</label>
          <label>Cantidad de puntos</label>
          <label>Puesto 1</label>
          <select>
            <option value="Corredor 1">Corredor 1</option>
            <option value="Corredor 2">Corredor 2</option>
            <option value="Corredor 3">Corredor 3</option>
            <option value="Corredor 4">Corredor 4</option>
          </select>
          <label>Puesto 2</label>
          <select>
            <option value="Corredor 1">Corredor 1</option>
            <option value="Corredor 2">Corredor 2</option>
            <option value="Corredor 3">Corredor 3</option>
            <option value="Corredor 4">Corredor 4</option>
          </select>
          <input type="number" placeholder="Ingrese monto a apostar" />
          <button>Enviar apuesta</button>
        </form>
        <form>
          <h2>Trifecta</h2>
          <label>Nombre Usuario:</label>
          <label>Cantidad de puntos</label>
          <label>Puesto 1</label>
          <select>
            <option value="Corredor 1">Corredor 1</option>
            <option value="Corredor 2">Corredor 2</option>
            <option value="Corredor 3">Corredor 3</option>
            <option value="Corredor 4">Corredor 4</option>
          </select>
          <label>Puesto 2</label>
          <select>
            <option value="Corredor 1">Corredor 1</option>
            <option value="Corredor 2">Corredor 2</option>
            <option value="Corredor 3">Corredor 3</option>
            <option value="Corredor 4">Corredor 4</option>
          </select>
          <label>Puesto 3</label>
          <select>
            <option value="Corredor 1">Corredor 1</option>
            <option value="Corredor 2">Corredor 2</option>
            <option value="Corredor 3">Corredor 3</option>
            <option value="Corredor 4">Corredor 4</option>
          </select>
          <input type="number" placeholder="Ingrese monto a apostar" />
          <button>Enviar apuesta</button>
        </form>
        <form>
          <h2>Superfecta</h2>
          <label>Nombre Usuario:</label>
          <label>Cantidad de puntos</label>
          <label>Puesto 1</label>
          <select>
            <option value="Corredor 1">Corredor 1</option>
            <option value="Corredor 2">Corredor 2</option>
            <option value="Corredor 3">Corredor 3</option>
            <option value="Corredor 4">Corredor 4</option>
          </select>
          <label>Puesto 2</label>
          <select>
            <option value="Corredor 1">Corredor 1</option>
            <option value="Corredor 2">Corredor 2</option>
            <option value="Corredor 3">Corredor 3</option>
            <option value="Corredor 4">Corredor 4</option>
          </select>
          <label>Puesto 3</label>
          <select>
            <option value="Corredor 1">Corredor 1</option>
            <option value="Corredor 2">Corredor 2</option>
            <option value="Corredor 3">Corredor 3</option>
            <option value="Corredor 4">Corredor 4</option>
          </select>
          <label>Puesto 4</label>
          <select>
            <option value="Corredor 1">Corredor 1</option>
            <option value="Corredor 2">Corredor 2</option>
            <option value="Corredor 3">Corredor 3</option>
            <option value="Corredor 4">Corredor 4</option>
          </select>
          <input type="number" placeholder="Ingrese monto a apostar" />
          <button>Enviar apuesta</button>
        </form>
      </div>
    </div>
  );
};

export default Home;
