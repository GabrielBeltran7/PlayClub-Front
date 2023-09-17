import style from "./Navbar.module.css";

const Navbar = () => {
  return (
    <nav className={style.nav}>
      <a href="/homeadmin">Dashboard</a>
    </nav>
  );
};

export default Navbar;
