/* eslint-disable no-unused-vars */
import {
  POST_USER,
  LOGIN_USER,
  GET_USER,
  POST_CORREDOR,
  POST_PUNTOS,
  POST_CARRERA,
  GET_USER_LOGIN,
  LOGOUT_USER,
  GET_CORREDOR,
  GET_CARRERA,
  GET_CARRERA_ACTIVA,
  POST_APUESTA_WIN,
  GET_LINK_CAMARAS,
  GET_CARRERA_CORREDORES,
  LOGIN_SUCCESS,
  GET_MIS_APUESTAS,
  POST_PUNTOS_SUB_A_USUARIO,
  CARGAR_BONOS_USUARIO,
  POST_LINK_DIRECTOS,
  CARGAR_PUNTOS_ADMIN,
  POST_GANADORES,
  ALL_APUESTAS,
  GET_GANADORES,
  GET_RECARGAR_PUNTOS,
  GET_PUNTOS_PAGADOS,
} from "./ActionsTypes";
import axios, { Axios } from "axios";
import Swal from "sweetalert2";



export const  getPuntosApostados =()=>{
  return async (dispatch) =>{

    try {
      const response = await axios.get("/admin/getpuntospagados")
      console.log("responsepuntos pagados", response)
      dispatch({
        type:GET_PUNTOS_PAGADOS,
        payload: response.data
      })
    } catch (error) {
      
    }
  }
}




export const retirarPuntos = (puntos) => {
  return async (dispatch) => {
    try {
      const response = await axios.patch("/admin/cobrarpuntosusuario", puntos);
      dispatch(getUserById());
      return response;
    } catch (error) {
      console.log(error);
      const avisoError = error.response.data.error;
      Swal.fire({
        icon: "error",
        title: avisoError,
        timerProgressBar: true,
        timer: 3500,
      });
    }
  };
};
export const actualizarPasswordUsuario = (actualizarpassword) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        "/users/actualizarpaswordusuario",
        actualizarpassword
      );
      Swal.fire({
        icon: "success",
        title: "Contraseña  actualizada con exito.",
        timerProgressBar: true,
        timer: 2500,
      });
    } catch (error) {
      const respuestaerror = error.response.data.error;
      Swal.fire({
        icon: "error",
        title: respuestaerror,
        timerProgressBar: true,
        timer: 2500,
      });
    }
  };
};

///////////////////////////////////////////////////////////////////
export const actualizarPerfilUsuario = (data) => {
  console.log("dataaaaaaaaa", data);
  return async (dispatch) => {
    try {
      const response = await axios.patch(
        "users//actualizarperfilusuario",
        data
      );
      if (response) {
        getUserByUsername();
        Swal.fire({
          icon: "success",
          title: "Perfil actualizado con exito.",
          timerProgressBar: true,
          timer: 2500,
        });
      }
    } catch (error) {
      const respuestaerror = error.response.data.mensaje;

      Swal.fire({
        icon: "error",
        title: respuestaerror,
        text: `revisa que el correo este bien`,
        timerProgressBar: true,
        timer: 3000,
      });
    }
  };
};
export const recuperPassword = (password) => {
  console.log("password", password);
  return async (dispatch) => {
    try {
      const response = await axios.post("/users/recuperarpassword", password);
      if (response) {
        Swal.fire({
          icon: "success",
          title: "Correo enviado con Exito.",
          text: `Revisa tu correo`,
          timerProgressBar: true,
          timer: 1500,
        });
      }

      return response;
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "No se pudo Enviar el correo Intenta mas tarde o",
        text: `Revisa que este bien`,
        timerProgressBar: true,
        timer: 2500,
      });
    }
  };
};
export const getRecargarPuntos = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get("/Admin/getrecargarpuntos/");
      dispatch({
        type: GET_RECARGAR_PUNTOS,
        payload: response.data,
      });
      return response;
    } catch (error) {
      throw error;
    }
  };
};

export const getCarrerayCorredores = (username) => {
  return async (dispatch) => {
    try {
      const response = (
        await axios.get(`/users/carreraycorredores/${username}`)
      ).data;

      dispatch({
        type: GET_CARRERA_CORREDORES,
        payload: response,
      });
      return response;
    } catch (error) {
      throw error;
    }
  };
};

export const getLinkcamaras = () => {
  return async (dispatch) => {
    try {
      const response = (await axios.get(`/users/linkcamaras/`)).data;
      dispatch({
        type: GET_LINK_CAMARAS,
        payload: response,
      });
      return response;
    } catch (error) {
      throw error;
    }
  };
};

export const apdateRoluser = (rol) => {
  return async (dispatch) => {
    try {
      const response = (await axios.patch(`/admin/roluser/`, rol)).data;
      return response;
    } catch (error) {
      throw error;
    }
  };
};

export const getcarreraActiva = (username) => {
  return async (dispatch) => {
    try {
      const response = (await axios.get(`/users/carreraactiva/${username}`))
        .data;

      dispatch({
        type: GET_CARRERA_ACTIVA,
        payload: response,
      });
      return response;
    } catch (error) {
      throw error;
    }
  };
};

export const getUserByUsername = (username) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/users/getUserByUsername/${username}`);
      dispatch({
        type: GET_USER_LOGIN,
        payload: response.data,
      });
      // console.log("getUserByUsername", response);
      return response;
    } catch (error) {
      throw error;
    }
  };
};

export const cargarpuntosaAdmin = (puntosAdmin) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        "admin/cargarpuntosaadministrador",
        puntosAdmin
      );
      // console.log("PUNTOSBACKKKKKKKKK", response);
      dispatch({ type: CARGAR_PUNTOS_ADMIN, payload: response.data });

      return response;
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "No eres un Administador Autorizado",
        timerProgressBar: true,
        timer: 1500,
      });
    }
  };
};

export const crearLinkDirectos = (linkdirectos) => {
  // console.log("linkdirectossssssss", linkdirectos);
  return async (dispatch) => {
    try {
      const response = await axios.post("/admin/postlinkcamaras", linkdirectos);
      dispatch({ type: POST_LINK_DIRECTOS, payload: response.data });

      return response;
    } catch (error) {
      throw error;
    }
  };
};

export const postUser = (user) => {
  // console.log("action post user", user);
  return async (dispatch) => {
    try {
      const response = await axios.post("/users", user);
      dispatch({ type: POST_USER, payload: response.data });

      return response;
    } catch (error) {
      throw error;
    }
  };
};
export const loginSuccess = (user) => ({
  type: LOGIN_SUCCESS,
  payload: user,
});

export const loginUser = (user) => {
  return async (dispatch) => {
    try {
      const response = await axios.post("/users/login", user);

      dispatch({ type: LOGIN_USER, payload: response.data });
      return response;
    } catch (error) {
      throw error;
    }
  };
};

export const getUserById = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get("/users/", {
        id: id,
      });
      dispatch({ type: GET_USER, payload: response.data });

      return response;
    } catch (error) {
      throw error;
    }
  };
};

export const getUserByIdParams = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/users/${id}`);
      dispatch({ type: GET_USER, payload: response.data });
      return response;
    } catch (error) {
      throw error;
    }
    bono;
  };
};

export const postCorredor = (corredor) => {
  return async (dispatch) => {
    try {
      const response = await axios.post("/admin/corredor", corredor);
      // dispatch({ type: POST_CORREDOR, payload: response.data });
      return response;
    } catch (error) {
      throw error;
    }
  };
};

export const cargaBonosaUsuarios = (user) => {
  return async (dispatch) => {
    try {
      const response = await axios.post("/admin/agregarpuntosausuarios", user);

      dispatch({ type: CARGAR_BONOS_USUARIO, payload: response.data });
      return response;
    } catch (error) {
      console.log(error);
      const avisoError = error.response.data.error;
      Swal.fire({
        icon: "error",
        title: avisoError,
        timerProgressBar: true,
        timer: 3500,
      });
      throw error;
    }
  };
};

export const cargarPuntosSubadmin = (user) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        "/admin/postpuntossubadminausuario",
        user
      );

      dispatch({ type: POST_PUNTOS_SUB_A_USUARIO, payload: response.data });
      return response;
    } catch (error) {
      const errorAviso = error.response;
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: errorAviso,
        timerProgressBar: true,
        timer: 1500,
      });
    }
  };
};
export const cargaPuntos = (user) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        "/admin/postpuntosadminasubadmin",
        user
      );

      dispatch({ type: POST_PUNTOS, payload: response.data });
      return response;
    } catch (error) {
      const errorAviso = error.response.data.error;
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: errorAviso,
        timerProgressBar: true,
        timer: 3000,
      });
    }
  };
};

export const crearCarrera = (carrera) => {
  return async (dispatch) => {
    try {
      const response = await axios.post("/admin/carrera", carrera);
      dispatch({ type: POST_CARRERA, payload: response.data });
      return response;
    } catch (error) {
      throw error;
    }
  };
};

export function logoutUser() {
  return function (dispatch) {
    return dispatch({
      type: LOGOUT_USER,
    });
  };
}

export const getCorredores = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get("/admin/corredor");
      dispatch({ type: GET_CORREDOR, payload: response.data });

      return response;
    } catch (error) {
      throw error;
    }
  };
};

export const getCarrera = () => {
  return async (dispatch) => {
    try {
      const response = (await axios.get("/admin/carrera")).data;
      dispatch({
        type: GET_CARRERA,
        payload: response,
      });

      return response;
    } catch (error) {
      throw error;
    }
  };
};

export const postApuestaWin = (apuesta) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`/apuestas/win/`, apuesta);
      dispatch({ type: POST_APUESTA_WIN, payload: response });

      return response;
    } catch (error) {
      throw error;
    }
  };
};

export const postApuestaExacta = (apuesta) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`/apuestas/exacta/`, apuesta);
      dispatch({ type: POST_APUESTA_WIN, payload: response });

      return response;
    } catch (error) {
      throw error;
    }
  };
};

export const postApuestaTrifecta = (apuesta) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`/apuestas/trifecta/`, apuesta);
      dispatch({ type: POST_APUESTA_WIN, payload: response });

      return response;
    } catch (error) {
      throw error;
    }
  };
};

export const postApuestaSuperfecta = (apuesta) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`/apuestas/superfecta/`, apuesta);
      dispatch({ type: POST_APUESTA_WIN, payload: response });

      return response;
    } catch (error) {
      throw error;
    }
  };
};

export const getMisApuestas = (username) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/users/getmisapuestas/${username}`);
      dispatch({ type: GET_MIS_APUESTAS, payload: response.data });
      // console.log("responseeeeeeeeeee", response.data);
      return response;
    } catch (error) {
      throw error;
    }
  };
};

export const postGanadores = (ganadores) => {
  console.log("crearganadoresssss", ganadores);
  return async (dispatch) => {
    try {
      const response = await axios.post("/admin/carrerayganadores", ganadores);
      console.log("respuesta back", response);
      dispatch({ type: POST_GANADORES, payload: response.data });
      return response;
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Ya se registraron ganadores para esta carrera",
        timerProgressBar: true,
        timer: 2500,
      });
    }
  };
};

export const getGanadores = (ganadoress) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `/users/ganadores/${ganadoress.nombrecarrera}`,
        {
          nombrecarrera: ganadoress.nombrecarrera,
        }
      );
      console.log("getganadores", response);
      dispatch({ type: GET_GANADORES, payload: response.data });
      return response;
    } catch (error) {
      throw error;
    }
  };
};

export const getAllApuestas = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get("/apuestas/apuestas");
      dispatch({ type: ALL_APUESTAS, payload: response.data });
      return response;
    } catch (error) {
      throw error;
    }
  };
};

export const actDesactCarrera = (carrera) => {
  return async (dispatch) => {
    try {
      const response = await axios.patch(
        "/admin/activarodesactivarcarrera",
        carrera
      );
      console.log("act desact carrera", response);
      return response;
    } catch (error) {
      throw error;
    }
  };
};
