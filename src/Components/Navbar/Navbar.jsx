import style from "./Navbar.module.css";
import { useSelector } from "react-redux";

const Navbar = () => {
  const usuario = useSelector((state) => state.user);

  return (
    <nav className={style.nav}>
      {usuario.admin ? (
        <a href="/homeadmin">Dashboard</a>
      ) : (
        <a href="/home/subadmin/">Dashboarda</a>
      )}
    </nav>
  );
};

export default Navbar;
