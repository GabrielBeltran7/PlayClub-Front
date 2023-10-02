import style from "./Navbar.module.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Navbar = () => {
  const user = useSelector((state) => state.user);

  return (
    <nav className={style.nav}>
      {user.admin ? (
        
        <Link to={`/homeadmin/${user.username}`}>Dashboard Admin</Link>

      ) : (
        
        <Link to={`/home/subadmin/${user.username}`}>Dashboard SubAdmin</Link>
      )}
    </nav>
  );
};

export default Navbar;
