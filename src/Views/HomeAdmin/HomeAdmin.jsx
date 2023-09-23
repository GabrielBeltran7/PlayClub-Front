import React, { useState, useEffect } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  FlagOutlined,
  AuditOutlined,
  DollarOutlined,
  UserAddOutlined,
  BookOutlined,
  DashboardOutlined,
  HomeOutlined,
  TrophyOutlined,
  VideoCameraOutlined,
  GoldOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
import style from "./HomeAdmin.module.css";
import CrearCorredor from "../../Components/crearCorredor/CrearCorredor";
import RecargarPuntos from "../../Components/RecargarPuntos/RecargarPuntos";
import CrearCarrera from "../../Components/CrearCarrera/CrearCarrera";
import AllCorredores from "../../Components/AllCorredores/AllCorredores";
import PublicarGanadoresAdmin from "../../Components/PublicarGanadoresAdmin/PublicarGanadoresAdmin";
import { useDispatch, useSelector } from "react-redux";
import { getUserByUsername } from "../../Redux/Actions";
import { useNavigate, useParams } from "react-router-dom";
import BonoAdmin from "../../Components/BonoAdmin/BonoAdmin";
import LinkDirectos from "../../Components/LinkDirectos/LinkDirectos";
import CargarpuntosAdmin from "../../Components/CargarPuntosaAdmin/CargarpuntosAdmin";

const { Header, Sider, Content } = Layout;
const HomeAdmin = () => {
  const { username } = useParams();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    dispatch(getUserByUsername(username));
  }, [username]);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  // Estado para rastrear el elemento seleccionado
  const [selectedItem, setSelectedItem] = useState("1");

  // Función para cambiar el elemento seleccionado
  const handleMenuItemClick = (key) => {
    setSelectedItem(key);
  };

  const imagenRace =
    "https://res.cloudinary.com/dou3yyisb/image/upload/v1694751058/PlayGame/race_lgienn.png";

  // Función para renderizar el componente correspondiente en función del elemento seleccionado
  const renderSelectedComponent = () => {
    switch (selectedItem) {
      case "1":
        return <RecargarPuntos />;
      case "2":
        return <CrearCorredor />;
      case "3":
        return <InformeIndividual />;
      case "4":
        return <InformeGeneral />;
      case "5":
        return <CrearCarrera user={user} />;
      case "6":
        return <AllCorredores />;

      case "8":
        return <BonoAdmin user={user} />;

      case "9":
        return <LinkDirectos user={user} />;

      case "10":
        return <CargarpuntosAdmin user={user} />;
      case "11":
        return <PublicarGanadoresAdmin user={user} />;

      default:
        return null;
    }
  };

  const navigate = useNavigate();

  const handlehomeSubAdmin = () => {
    navigate("/home");
  };

  return (
    <div className={style.container}>
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            onClick={({ key }) => handleMenuItemClick(key)} // Maneja los clics en los elementos del menú
            items={[
              {
                key: "1",
                icon: <DollarOutlined />,
                label: "Usuarios",
              },
              {
                key: "2",
                icon: <UserAddOutlined />,
                label: "Crear Corredor",
              },
              {
                key: "3",
                icon: <AuditOutlined />,
                label: "Informe Individual",
              },
              {
                key: "4",
                icon: <BookOutlined />,
                label: "Informe General",
              },
              {
                key: "5",
                icon: <FlagOutlined />,
                label: "Crear Carrera",
              },
              {
                key: "6",
                icon: <DashboardOutlined />,
                label: "Corredores",
              },
              {
                key: "7",
                icon: <HomeOutlined />,
                label: "Home",
                onClick: () => handlehomeSubAdmin(),
              },
              {
                key: "8",
                icon: <GoldOutlined />,
                label: "Bonos",
              },
              {
                key: "9",
                icon: <VideoCameraOutlined />,
                label: "LinkDirectos",
              },
              {
                key: "10",
                icon: <HomeOutlined />,
                label: "CargarPuntosAdmin",
              },
              {
                key: "11",
                icon: <TrophyOutlined />,
                label: "Ganadores",
              },
            ]}
          />
        </Sider>
        <Layout>
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
            }}
          >
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
          </Header>
          <Content
            style={{
              margin: "10px 10px",
              padding: 24,
              minHeight: "91.1vh",
              background: colorBgContainer,
            }}
          >
            {/* Renderiza el componente seleccionado */}
            {renderSelectedComponent()}
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};
export default HomeAdmin;
