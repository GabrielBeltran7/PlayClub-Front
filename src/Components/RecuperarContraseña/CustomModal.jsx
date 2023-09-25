import React, { useState } from 'react';
import styles from './customModal.module.css'; // Importa los estilos CSS
import { useDispatch } from 'react-redux';

function CustomModal(props) {
  const { show, handleClose, children } = props;

  const [inputValue, setInputValue] = useState({
    email:""
  });

  const [isValidEmail, setIsValidEmail] = useState(true); // Estado para el resultado de la validación
  const dispatch= useDispatch()

  const handleInputChange = (event) => {
    setInputValue({
        ...inputValue,
        [event.target.name]: event.target.value
      });
    
    // Validación de correo electrónico
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    setIsValidEmail(emailPattern.test(value));
  };

  const handleModalSubmit = () => {
    // Verificar si el email ingresado es válido antes de cerrar el modal
    if (isValidEmail) {
      // Realizar alguna acción con el valor de inputValue si es válido
    //   dispatch(recuperpassword(inputValue))
      console.log("Pruebaaaa",inputValue)
    } else {
      // El email no es válido, puedes mostrar un mensaje de error o realizar alguna acción adicional
      alert('Por favor, ingresa un correo electrónico válido.');
    }
  };

  return (
    <div className={`${styles['custom-modal']} ${show ? styles.show : ''}`}>
      <div className={styles['modal-content']}>
       
        <h1 className={styles['modal-title']}>Recuperar Contraseña</h1>
        <p className={styles['modal-description']}>Por favor, proporciona tu dirección de correo electrónico:</p>
        <input
          type="text"
          name='email'
          onChange={handleInputChange}
          className={`${styles['modal-input']} ${!isValidEmail ? styles['invalid-input'] : ''}`}
          placeholder="Escribe tu correo..."
        />
        <button className={styles['modal-button']} onClick={handleModalSubmit}>
          Recuperar
        </button>
        {children}
      </div>
    </div>
  );
}

export default CustomModal;





