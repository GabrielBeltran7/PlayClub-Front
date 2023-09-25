import { useEffect, useState } from "react";
import style from "./Home.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserByUsername,
  logoutUser,
  getCarrera,
  getCorredores,
  getcarreraActiva,
  postApuestaWin,
  postApuestaExacta,
  postApuestaTrifecta,
  postApuestaSuperfecta,
  getLinkcamaras,
  getCarrerayCorredores,
  getMisApuestas,
} from "../../Redux/Actions";
import React from "react";
import { AntDesignOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import Navbar from "../../Components/Navbar/Navbar";
import Swal from "sweetalert2";
import YouTubePlayer from "../../Components/YouTubePlayer/YouTubePlayer";
import ViewMisApuestas from "../../Components/ViewMisApuestas/ViewMisApuestas";
import Ganadores from "../../Components/GanadoresCarrera/GanadoresCarrera";
import MenuDesplegable from "../../Components/MenuDesplegableApuestas/MenuDesplegable";
import { useNavigate } from "react-router-dom";
import Whatsapp from "../../Components/Whatsapp/Whatsapp";

const Home = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const usuario = useSelector((state) => state.user);
  const carrera = useSelector((state) => state.carrera);
  const unicacarrera = useSelector((state) => state.unicacarrera);
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  //console.log(usuario);

  const carreraycorredores = useSelector((state) => state.carreraycorredores);

  console.log("22222222222222222222222", carreraycorredores);
  const [carreraMostrar, setCarreraMostrar] = useState({});
  const [carreraSeleccionada, setCarreraSeleccionada] = useState("");

  const username = usuario ? usuario.username : null; // Cambiamos userId a username
  useEffect(() => {
    getMisApuestas(usuario.username);
  }, []);

  const [win, setWin] = useState({
    id: usuario.id,
    username: usuario.username,
    nombreapuesta: "",
    puesto1: "",
    puntosapostados: "",
    puntosganados: "",
  });
  const [exacta, setExacta] = useState({
    id: usuario.id,
    username: usuario.username,
    nombreapuesta: "",
    puesto1: "",
    puesto2: "",
    puntosapostados: "",
    puntosganados: "",
  });
  const [trifecta, setTrifecta] = useState({
    id: usuario.id,
    username: usuario.username,
    nombreapuesta: "",
    puesto1: "",
    puesto2: "",
    puesto3: "",
    puntosapostados: "",
    puntosganados: "",
  });

  const [superfecta, setSuperfecta] = useState({
    id: usuario.id,
    username: usuario.username,
    nombreapuesta: "",
    puesto1: "",
    puesto2: "",
    puesto3: "",
    puesto4: "",
    puntosapostados: "",
    puntosganados: "",
  });
  //!---------------------------Imagenes preview---------------------------------------------------
  const imagenes = {
    win: "https://res.cloudinary.com/dou3yyisb/image/upload/v1694750064/PlayGame/win_ffepdt.png",
    exacta:
      "https://res.cloudinary.com/dou3yyisb/image/upload/v1694750064/PlayGame/exacta_vwby15.png",
    trifecta:
      "https://res.cloudinary.com/dou3yyisb/image/upload/v1694750064/PlayGame/trifecta_uqnslm.png",
    superfecta:
      "https://res.cloudinary.com/dou3yyisb/image/upload/v1694750064/PlayGame/superfecta_uezsse.png",
  };
  //!---------------------Handle para cargar la carrera al estado---------------------
  const handlechangecarreraActiva = (event) => {
    dispatch(getcarreraActiva(event.target.value));
    const selectedCarrera = event.target.value;
    setCarreraSeleccionada(selectedCarrera);
    if (selectedCarrera !== "") {
      dispatch(getCarrerayCorredores(event.target.value));
    }

    setWin({
      ...win,
      id: usuario.id,
      username: usuario.username,
      [event.target.name]: event.target.value,
    });
    setExacta({
      ...exacta,
      id: usuario.id,
      username: usuario.username,
      [event.target.name]: event.target.value,
    });
    setTrifecta({
      ...trifecta,
      id: usuario.id,
      username: usuario.username,
      [event.target.name]: event.target.value,
    });
    setSuperfecta({
      ...superfecta,
      id: usuario.id,
      username: usuario.username,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    if (carreraSeleccionada) {
      const selectedCarreraData = carrera.find(
        (element) => element.nombrecarrera === carreraSeleccionada
      );
      setCarreraMostrar(selectedCarreraData || {});
    } else {
      // Si no se selecciona ninguna carrera, establece carreraMostrar como un objeto vacío
      setCarreraMostrar({});
    }
  }, [carreraSeleccionada, carrera]);
  //!------------------------------------handlechange win-------------------------------
  const handleChangewin = (event) => {
    const pointsApost = event.target.value;
    const puntosganados = (pointsApost * unicacarrera.porcentajeWin) / 100;
    setWin({
      ...win,
      id: usuario.id,
      username: usuario.username,
      puntosganados: puntosganados,
      [event.target.name]: event.target.value,
    });
  };

  //!---------------------------------------handlechange Exacta----------------------------
  const handleChangeExacta = (event) => {
    const pointsApost = event.target.value;
    const puntosganados = (pointsApost * unicacarrera.porcentajeExacta) / 100;
    setExacta({
      ...exacta,
      id: usuario.id,
      username: usuario.username,
      puntosganados: puntosganados,
      [event.target.name]: event.target.value,
    });
  };

  //!--------------------------------------handlechange Trifecta-----------------------------

  const handleChangeTrifecta = (event) => {
    const pointsApost = event.target.value;
    const puntosganados = (pointsApost * unicacarrera.porcentajeTrifecta) / 100;
    setTrifecta({
      ...trifecta,
      id: usuario.id,
      username: usuario.username,
      puntosganados: puntosganados,
      [event.target.name]: event.target.value,
    });
  };

  //!--------------------------------------handlechange superfecta-----------------------------

  const handleChangeSuperfecta = (event) => {
    const pointsApost = event.target.value;
    const puntosganados =
      (pointsApost * unicacarrera.porcentajeSuperfecta) / 100;
    setSuperfecta({
      ...superfecta,
      id: usuario.id,
      username: usuario.username,
      puntosganados: puntosganados,
      [event.target.name]: event.target.value,
    });
  };
  //*--------------------handle logout-----------------------
  const handleLogout = () => {
    localStorage.removeItem("username");
    dispatch(logoutUser());
  };

  //*--------------------- trae todos los los link de las camaras--------------------------------
  useEffect(() => {
    dispatch(getLinkcamaras());
  }, []);
  //*--------------------- peticiones carrera y corredores--------------------------------
  useEffect(() => {
    dispatch(getCarrera());
    dispatch(getCorredores());
  }, []);
  //*------------------------mmantener logueado-------------------------------------
  useEffect(() => {
    // Verifica si existe un nombre de usuario en el almacenamiento local
    const storedUsername = localStorage.getItem("username"); // Cambiamos userId a username

    // Si hay un nombre de usuario almacenado localmente, úsalo
    if (storedUsername) {
      dispatch(getUserByUsername(storedUsername)); // Cambiamos la acción a getUserByUsername
    } else if (username) {
      // Si no hay un nombre de usuario almacenado localmente pero hay uno en el estado, guárdalo en el almacenamiento local
      localStorage.setItem("username", username); // Cambiamos userId a username

      dispatch(getUserByUsername(username)); // Cambiamos la acción a getUserByUsername
    }
  }, [dispatch, username]); // Cambiamos userId a username
  //!-----------------------------submit win-------------------------
  const handleSubmitWin = async (event) => {
    event.preventDefault();
    try {
      const response = await dispatch(postApuestaWin(win));

      if (response) {
        Swal.fire({
          icon: "success",
          title: "Apuesta Realizada",
          text: "Se concretó la apuesta",
          timerProgressBar: true,
          timer: 2500,
        });
        dispatch(getUserByUsername(username));
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: error.response.data.error,
        text: "Adquiere más puntos para seguir",
        timerProgressBar: true,
        timer: 2500,
      });
    }
  };
  //!------------------------------------Submit Exacta----------------------
  const handleSubmitExacta = async (event) => {
    event.preventDefault();
    try {
      const response = await dispatch(postApuestaExacta(exacta));

      if (response) {
        Swal.fire({
          icon: "success",
          title: "Apuesta Realizada",
          text: "Se concretó la apuesta",
          timerProgressBar: true,
          timer: 2500,
        });
        dispatch(getUserByUsername(username));
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: error.response.data.error,
        text: "Adquiere más puntos para seguir",
        timerProgressBar: true,
        timer: 2500,
      });
    }
  };

  //!-------------------------------------------Submit Trifecta--------------------------------
  const handleSubmitTrifecta = async (event) => {
    event.preventDefault();
    try {
      const response = await dispatch(postApuestaTrifecta(trifecta));

      if (response) {
        Swal.fire({
          icon: "success",
          title: "Apuesta Realizada",
          text: "Se concretó la apuesta",
          timerProgressBar: true,
          timer: 2500,
        });
        dispatch(getUserByUsername(username));
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "",
        text: "Adquiere más puntos para seguir",
        timerProgressBar: true,
        timer: 2500,
      });
    }
  };

  //!-------------------------------------------Submit Superfecta--------------------------------

  const handleSubmitSuperfecta = async (event) => {
    event.preventDefault();
    try {
      const response = await dispatch(postApuestaSuperfecta(superfecta));

      if (response) {
        Swal.fire({
          icon: "success",
          title: "Apuesta Realizada",
          text: "Se concretó la apuesta",
          timerProgressBar: true,
          timer: 2500,
        });
        dispatch(getUserByUsername(username));
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: error.response.data.error,
        text: "Adquiere más puntos para seguir",
        timerProgressBar: true,
        timer: 2500,
      });
    }
  };
  console.log(usuario.imagen);

  const carreraFilter = carrera.filter((c) => c.actydescarrera === true);

  const redirigirAInicio = () => {
    navigate('/GanadoresCarrera'); // Redirige a la ruta de inicio (cambia '/' por la ruta correcta si es diferente)
  };
  return (
    <div className={style.container}>
      {usuario.admin || usuario.subadmin ? (
        <div className={style.navbar}>
          <Navbar props={usuario.admin} />
          <ViewMisApuestas />
        </div>
      ) : (
        <></>
      )}
      <div className={style.containerInfoUser}>
        <div className={style.contendorUser}>
          <div className={style.infoUsuario}>
            <Avatar
              size={{
                xs: 60,
                sm: 32,
                md: 40,
                lg: 64,
                xl: 80,
                xxl: 100,
              }}
              src={usuario.imagen ? usuario.imagen : <AntDesignOutlined />}
            />
            <div className={style.userCreditos}>
              <p>
                {usuario.username ? (
                  usuario.username
                ) : (
                  <p>
                    <a href="/login">Inicia sesion</a> o
                    <a href="/register"> registrate</a>
                  </p>
                )}
              </p>
              <label className={style.creditosIMG}>
                {usuario.id ? (
                  <p>
                    Creditos: {usuario.cantidadtotal}{" "}
                    <img
                      src="https://cdn-icons-png.flaticon.com/128/566/566445.png"
                      alt=""
                      width="20"
                      height="50"
                    />
                  </p>
                ) : (
                  ""
                )}{" "}
              </label>
            </div>
          </div>
          <div>
            {usuario.id ? (
              <button onClick={handleLogout}>Desloguear</button>
            ) : (
              ""
            )}
          </div>
          
        </div>
        <button className={style.botonganadores} onClick={redirigirAInicio}>Ganadores</button>

        <div className={style.contImageLogo}>
          <img
            src="https://res.cloudinary.com/dou3yyisb/image/upload/v1694444797/PlayGame/logo-removebg_haqooq.png"
            alt=""
            width="500"
          />
        </div>
      </div>
      <div className={style.selectCarreraContainer}>
        <div className={style.preview}>
          <h2>Seleccione una Carrera</h2>
          {usuario.id ? (
            <>
              <select name="nombreapuesta" onChange={handlechangecarreraActiva}>
                <option value="">Carreras</option>
                {carreraFilter.map((element) => (
                  <option key={element.id}>
                    {" "}
                    {element.nombrecarrera} {element.numero}{" "}
                  </option>
                ))}
                ,
              </select>
            </>
          ) : (
            <p>
              {" "}
              <a href="/login">inicie sesión</a> o{" "}
              <a href="/register">Registrese</a>
            </p>
          )}

          <div className={style.bloque}>
            <img src={imagenes.win} alt="" width="30" />
            <label>WIN: {carreraMostrar.porcentajeWin}%</label>
            <img src={imagenes.exacta} alt="" width="30" />
            <label>EXACTA: {carreraMostrar.porcentajeExacta}%</label>
          </div>
          <div className={style.bloque}>
            <img src={imagenes.trifecta} alt="" width="30" />
            <label>TRIFECTA: {carreraMostrar.porcentajeTrifecta}%</label>

            <img src={imagenes.superfecta} alt="" width="30" />
            <label>SUPERFECTA: {carreraMostrar.porcentajeSuperfecta}%</label>
          </div>
        </div>
      </div>
      {/* //? ------------------------FormularioWIN--------------------------------- */}
      <div className={style.formContainer}>
        <form onSubmit={handleSubmitWin}>
          <h2>Win</h2>
          <label>Corredores</label>
          <label>Puesto 1</label>
          <select name="puesto1" onChange={handleChangewin} required>
            <option value="">--Elije un corredor--</option>
            {Object.keys(carreraycorredores).length && carreraSeleccionada
              ? carreraycorredores.Crearcorredors.map((element) => (
                  <option key={element.id}>
                    {" "}
                    {element.nombre} {element.numero}{" "}
                  </option>
                ))
              : ""}
            ,
          </select>
          {unicacarrera.id ? (
            <input
              type="number"
              placeholder="Ingrese monto a apostar"
              name="puntosapostados"
              onChange={handleChangewin}
            />
          ) : usuario.id ? (
            <label className={style.selectCarrera}>
              Seleccione una carrera
            </label>
          ) : (
            ""
          )}

          <p className={style.puntosGanados}>{win.puntosganados}</p>
          {usuario.id ? (
            <button disabled={!win.puntosapostados}>Enviar apuesta</button>
          ) : (
            <p className={style.avisoNoLogin}>
              <a href="/login">Inicia sesion</a> o
              <a href="/register"> registrate</a>
            </p>
          )}
        </form>
        {/* //?-----------------------Formulario Exacta----------------------------- */}
        <form onSubmit={handleSubmitExacta}>
          <h2>Exacta</h2>
          <label>Corredores</label>
          <label>Puesto 1</label>

          <select name="puesto1" onChange={handleChangeExacta} required>
            <option value="">--Elije un corredor--</option>
            {Object.keys(carreraycorredores).length && carreraSeleccionada
              ? carreraycorredores.Crearcorredors.map((element) => (
                  <option key={element.id}>
                    {" "}
                    {element.nombre} {element.numero}{" "}
                  </option>
                ))
              : ""}
            ,
          </select>
          <label>Puesto 2</label>
          <select name="puesto2" onChange={handleChangeExacta} required>
            <option value="">--Elije un corredor--</option>
            {Object.keys(carreraycorredores).length && carreraSeleccionada
              ? carreraycorredores.Crearcorredors.map((element) => (
                  <option key={element.id}>
                    {" "}
                    {element.nombre} {element.numero}{" "}
                  </option>
                ))
              : ""}
            ,
          </select>
          {unicacarrera.id ? (
            <input
              type="number"
              placeholder="Ingrese monto a apostar"
              name="puntosapostados"
              onChange={handleChangeExacta}
            />
          ) : usuario.id ? (
            <label className={style.selectCarrera}>
              Seleccione una carrera
            </label>
          ) : (
            ""
          )}
          <p className={style.puntosGanados}>{exacta.puntosganados}</p>
          {usuario.id ? (
            <button disabled={!exacta.puntosapostados}>Enviar apuesta</button>
          ) : (
            <p className={style.avisoNoLogin}>
              <a href="/login">Inicia sesion</a> o
              <a href="/register"> registrate</a>
            </p>
          )}
        </form>
        {/* //?-------------------Formulario Trifecta------------ */}
        <form onSubmit={handleSubmitTrifecta}>
          <h2>Trifecta</h2>
          <label>Corredores</label>
          <label>Puesto 1</label>
          <select name="puesto1" onChange={handleChangeTrifecta} required>
            <option value="">--Elije un corredor--</option>
            {Object.keys(carreraycorredores).length && carreraSeleccionada
              ? carreraycorredores.Crearcorredors.map((element) => (
                  <option key={element.id}>
                    {" "}
                    {element.nombre} {element.numero}{" "}
                  </option>
                ))
              : ""}
            ,
          </select>
          <label>Puesto 2</label>
          <select name="puesto2" onChange={handleChangeTrifecta} required>
            <option value="">--Elije un corredor--</option>
            {Object.keys(carreraycorredores).length && carreraSeleccionada
              ? carreraycorredores.Crearcorredors.map((element) => (
                  <option key={element.id}>
                    {" "}
                    {element.nombre} {element.numero}{" "}
                  </option>
                ))
              : ""}
            ,
          </select>
          <label>Puesto 3</label>
          <select name="puesto3" onChange={handleChangeTrifecta} required>
            <option value="">--Elije un corredor--</option>
            {Object.keys(carreraycorredores).length && carreraSeleccionada
              ? carreraycorredores.Crearcorredors.map((element) => (
                  <option key={element.id}>
                    {" "}
                    {element.nombre} {element.numero}{" "}
                  </option>
                ))
              : ""}
            ,
          </select>
          {unicacarrera.id ? (
            <input
              type="number"
              placeholder="Ingrese monto a apostar"
              name="puntosapostados"
              onChange={handleChangeTrifecta}
            />
          ) : usuario.id ? (
            <label className={style.selectCarrera}>
              Seleccione una carrera
            </label>
          ) : (
            ""
          )}
          <p className={style.puntosGanados}>{trifecta.puntosganados}</p>
          {usuario.id ? (
            <button disabled={!trifecta.puntosapostados}>Enviar apuesta</button>
          ) : (
            <p className={style.avisoNoLogin}>
              <a href="/login">Inicia sesion</a> o
              <a href="/register"> registrate</a>
            </p>
          )}
        </form>
        {/* //?-------------------Formulario Superfecta------------ */}
        <form onSubmit={handleSubmitSuperfecta}>
          <h2>Superfecta</h2>
          <label>Corredores</label>
          <label>Puesto 1</label>
          <select name="puesto1" onChange={handleChangeSuperfecta} required>
            <option value="">--Elije un corredor--</option>
            {Object.keys(carreraycorredores).length && carreraSeleccionada
              ? carreraycorredores.Crearcorredors.map((element) => (
                  <option key={element.id}>
                    {" "}
                    {element.nombre} {element.numero}{" "}
                  </option>
                ))
              : ""}
            ,
          </select>
          <label>Puesto 2</label>
          <select name="puesto2" onChange={handleChangeSuperfecta} required>
            <option value="">--Elije un corredor--</option>
            {Object.keys(carreraycorredores).length && carreraSeleccionada
              ? carreraycorredores.Crearcorredors.map((element) => (
                  <option key={element.id}>
                    {" "}
                    {element.nombre} {element.numero}{" "}
                  </option>
                ))
              : ""}
            ,
          </select>
          <label>Puesto 3</label>
          <select name="puesto3" onChange={handleChangeSuperfecta} required>
            <option value="">--Elije un corredor--</option>
            {Object.keys(carreraycorredores).length && carreraSeleccionada
              ? carreraycorredores.Crearcorredors.map((element) => (
                  <option key={element.id}>
                    {" "}
                    {element.nombre} {element.numero}{" "}
                  </option>
                ))
              : ""}
            ,
          </select>
          <label>Puesto 4</label>
          <select name="puesto4" onChange={handleChangeSuperfecta} required>
            <option value="">--Elije un corredor--</option>
            {Object.keys(carreraycorredores).length && carreraSeleccionada
              ? carreraycorredores.Crearcorredors.map((element) => (
                  <option key={element.id}>
                    {" "}
                    {element.nombre} {element.numero}{" "}
                  </option>
                ))
              : ""}
            ,
          </select>
          {unicacarrera.id ? (
            <input
              type="number"
              placeholder="Ingrese monto a apostar"
              name="puntosapostados"
              onChange={handleChangeSuperfecta}
            />
          ) : usuario.id ? (
            <label className={style.selectCarrera}>
              Seleccione una carrera
            </label>
          ) : (
            ""
          )}
          <p className={style.puntosGanados}>{superfecta.puntosganados}</p>
          {usuario.id ? (
            <button disabled={!superfecta.puntosapostados}>
              Enviar apuesta
            </button>
          ) : (
            <p className={style.avisoNoLogin}>
              <a href="/login">Inicia sesion</a> o
              <a href="/register"> registrate</a>
            </p>
          )}
        </form>
      </div>
      <YouTubePlayer />
      <div className={style.whatsapp}>
        <Whatsapp />
      </div>
    </div>
  );
};

export default Home;
