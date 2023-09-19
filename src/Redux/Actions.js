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
  GET_LINK_CAMARAS
} from "./ActionsTypes";
import axios from "axios";
// import swal from "sweetalert2";

export const getLinkcamaras = () => {
  return async (dispatch) => {
    try {
      const response = (await axios.get(`/users/linkcamaras/`)).data;
dispatch({
type: GET_LINK_CAMARAS,
payload:response
})
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
      const response = (await axios.get(`/users/getUserByUsername/${username}`))
        .data;

      dispatch({
        type: GET_USER_LOGIN,
        payload: response,
      });
      return response;
    } catch (error) {
      throw error;
    }
  };
};

export const postUser = (user) => {
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
  };
};

export const postCorredor = (corredor) => {
  return async (dispatch) => {
    try {
      const response = await axios.post("/admin/corredor", corredor);
      dispatch({ type: POST_CORREDOR, payload: response.data });
      return response;
    } catch (error) {
      throw error;
    }
  };
};

export const cargaPuntos = (user) => {
  return async (dispatch) => {
    try {
      const response = await axios.post("/admin/puntos", user);
      dispatch({ type: POST_PUNTOS, payload: response.data });
      return response;
    } catch (error) {
      throw error;
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
