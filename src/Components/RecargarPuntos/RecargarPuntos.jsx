import { SearchOutlined } from "@ant-design/icons";
import React, { useRef, useState, useEffect } from "react";
import Highlighter from "react-highlight-words";
import { Button, Input, Space, Table, Typography, Tag, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import * as XLSX from 'xlsx';
import moment from "moment";
// 

import {
  getUserById,
  apdateRoluser,
  
} from "../../Redux/Actions";
import style from "./RecargarPuntos.module.css";

const RecargarPuntos = () => {

 
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const allUsers = useSelector((state) => state.userId);
  // render: (date) => moment(date).format("YYYY-MM-DD HH:mm:ss"),
if(allUsers){
  allUsers.forEach((user) => {
    // Formatea la fecha en el formato deseado
    user.createdAt = moment (user.createdAt).format("YYYY-MM-DD HH:mm:ss")
    user.updatedAt = moment (user.updatedAt).format("YYYY-MM-DD HH:mm:ss")
  });
}
  const dispatch = useDispatch();

  const [rol, setRol] = useState(false);


  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(allUsers);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'User');
   

    // Guardar el archivo de Excel
    XLSX.writeFile(wb, 'users.xlsx');
  };


  const handleChange = (record) => (event) => {
    dispatch(
      apdateRoluser({
        username: record.username,
        rol: event,
      })
    );
    if (rol) {
      setRol(false);
    } else {
      setRol(true);
    }
  };

  useEffect(() => {
    dispatch(getUserById());
  }, [dispatch]);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
              

        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },

    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      width: "20%",
      ...getColumnSearchProps("username"),
      render: (text, record) => (
        <a href={`/cargapuntos/${record.id}`}>{text}</a>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: "20%",
      ...getColumnSearchProps("email"),
    },
    {
      title: "Role",
      dataIndex: "admin",
      key: "role",
      render: (text, record) => (
        <Tag color={record.admin ? "red" : record.subadmin ? "green" : "blue"}>
          {record.admin ? "Admin" : record.subadmin ? "SubAdmin" : "Usuario"}
        </Tag>
      ),
    },

    {
      title: "Cantidad de puntos",
      dataIndex: "cantidadtotal",
      key: "cantidadtotal",
      ...getColumnSearchProps("cantidadtotal"),
    },
    {
      title: "Permisos",
      dataIndex: "admin",
      key: "city",
      render: (text, record) => (
        <Select
          onChange={handleChange(record)}
          defaultValue={
            record.admin ? "admin" : record.subadmin ? "subadmin" : "usuario"
          }
          style={{ width: 120 }}
        >
          <Select.Option value="Admin">Admin</Select.Option>
          <Select.Option value="SubAdmin">Sub Admin</Select.Option>
          <Select.Option value="Usuario">Usuario</Select.Option>
          {/* Agrega otras opciones según tus necesidades */}
        </Select>
      ),
    },
  ];

  return (
    <div>
      <div className={style.botonexcel}>
      <button onClick={exportToExcel}>Exportar a excel 📑</button>
      </div>
      
      <Table
        columns={columns}
        dataSource={allUsers.map((user) => ({ ...user, key: user.id }))}
      />
      
      <div>
        <div className={style.containerAviso}>
          <label className={style.aviso}>
            Para cargar puntos a un usuario presionar sobre el nombre de un
            usuario y ahí te llevará al formulario para cargar puntos al usuario
            seleccionado
          </label>
        </div>
      </div>
    </div>
  );
};
export default RecargarPuntos;
