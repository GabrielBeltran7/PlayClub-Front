import {
  AppstoreOutlined,
  UserAddOutlined,
  PieChartOutlined,
  DollarOutlined,
  AuditOutlined,
  BookOutlined,
} from "@ant-design/icons";
import { Button, Menu } from "antd";
import React, { useState } from "react";
import style from "./HomeAdmin.module.css";
import CrearCorredor from "../../Components/crearCorredor/CrearCorredor";
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const items = [
  getItem("Crear Corredor", "1", <UserAddOutlined />),
  getItem("Recargar Puntos", "2", <DollarOutlined />),
  getItem("Informe Individual", "3", <AuditOutlined />),
  getItem("Informe General", "4", <BookOutlined />),
  getItem("Crear Apuesta", "sub2", <AppstoreOutlined />, [
    getItem("WIN", "9"),
    getItem("EXACTA", "10"),
    getItem("TRIFECTA", "11"),
    getItem("SUPERFECTA", "12"),
  ]),
];

const HomeAdmin = () => {
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  const [showCreateUser, setShowCreateUser] = useState(false); // Estado para controlar la visibilidad

  const toggleCreateUser = () => {
    setShowCreateUser(!showCreateUser);
  };
  return (
    <div className={style.contenedor}>
      <div
        style={{
          width: 300,
        }}
      >
        <Menu
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
          theme="dark"
          inlineCollapsed={collapsed}
          items={items}
          style={{ minHeight: "100vh", overflowY: "auto" }}
        />
      </div>
      <div className={style.content}>
        {/* Mostrar o ocultar el componente de crear corredor según el estado */}
        {showCreateUser && <CrearCorredor />}
      </div>
    </div>
  );
};

export default HomeAdmin;
