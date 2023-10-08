import React from 'react'
import style from "./BotonAtras.module.css"

const BotonAtras = () => {


    
        const handleVolverAtras = () => {
          window.history.back();
        };

  return (
    <div>
        <button className={style.boton} onClick={handleVolverAtras}>Atras</button>
    </div>
  )
}

export default BotonAtras