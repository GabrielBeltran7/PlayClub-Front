import { getMisApuestas } from "../../Redux/Actions";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./ViewMisApuestas.module.css";
import ApuestaSection from "./ApuestaSection";

const ViewMisApuestas = () => {
  const dispatch = useDispatch();
  const usuario = useSelector((state) => state.user);
  const userName = usuario.username;
  const misApuestas = useSelector((state) => state.misApuestas);
  console.log(misApuestas);
  console.log(usuario);

  const [isOpen, setIsOpen] = useState({}); // Estado para controlar la apertura/cierre de las secciones

  const toggleDropdown = (title) => {
    setIsOpen({
      ...isOpen,
      [title]: !isOpen[title], // Cambia el estado de la sección específica
    });
  };

  useEffect(() => {
    dispatch(getMisApuestas(userName));
  }, [usuario]);

  return (
    <div className={style.prueba}>
      <ApuestaSection
        title="Apuestas WIN"
        apuestas={misApuestas.win}
        isOpen={isOpen["Apuestas WIN"]}
        toggleDropdown={() => toggleDropdown("Apuestas WIN")}
      />

      <ApuestaSection
        title="Apuestas Exacta"
        apuestas={misApuestas.exacta}
        isOpen={isOpen["Apuestas Exacta"]}
        toggleDropdown={() => toggleDropdown("Apuestas Exacta")}
      />

      <ApuestaSection
        title="Apuestas Trifecta"
        apuestas={misApuestas.trifecta}
        isOpen={isOpen["Apuestas Trifecta"]}
        toggleDropdown={() => toggleDropdown("Apuestas Trifecta")}
      />

      <ApuestaSection
        title="Apuestas Superfecta"
        apuestas={misApuestas.superfecta}
        isOpen={isOpen["Apuestas Superfecta"]}
        toggleDropdown={() => toggleDropdown("Apuestas Superfecta")}
      />
    </div>
  );
};

export default ViewMisApuestas;
