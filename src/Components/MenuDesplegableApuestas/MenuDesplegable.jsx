import ViewMisApuestas from "../ViewMisApuestas/ViewMisApuestas";

const MenuDesplegable = ({ isOpen, toggleMenu }) => {
  return (
    <div className={`menu ${isOpen ? "open" : ""}`}>
      <ViewMisApuestas />
    </div>
  );
};

export default MenuDesplegable;
