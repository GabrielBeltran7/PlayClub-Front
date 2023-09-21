import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DollarOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
import style from "./HomeSubAdmin.module.css";
import AllUsersSubAdmin from "../../Components/AllUsersSubAdmin/AllUsersSubAdmin";
import { useNavigate } from "react-router-dom";

const { Header, Sider, Content } = Layout;
const HomeSubAdmin = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const navigate = useNavigate();

  const handlehomeSubAdmin = () => {
    navigate("/home");
  };

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
        return <AllUsersSubAdmin />;
      default:
        return null;
    }
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
                icon: <HomeOutlined />,
                label: "Home",
                onClick: () => handlehomeSubAdmin(),
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
export default HomeSubAdmin;
