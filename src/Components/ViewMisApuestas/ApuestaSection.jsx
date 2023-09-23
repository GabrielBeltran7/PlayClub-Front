import style from "./ViewMisApuestas.module.css";

const ApuestaSection = ({ title, apuestas, isOpen, toggleDropdown }) => {
  return (
    <div className={style.prueba}>
      <button onClick={toggleDropdown}>
        {isOpen ? `${title} - Abierto` : `${title} - Cerrado`}
      </button>
      {isOpen && (
        <div>
          {apuestas.map((apuesta) => (
            <div className={style.apuesta} key={apuesta.id}>
              <p>Nombre Carrera: {apuesta.nombreapuesta}</p>
              <p>
                Fecha:{" "}
                {new Date(apuesta.createdAt).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <p>Puntos apostados: {apuesta.puntosapostados}</p>
              <p>Posible ganancia: {apuesta.puntosganados}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ApuestaSection;
